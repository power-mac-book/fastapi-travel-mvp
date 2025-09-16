from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.services.tenant_service import get_tenant_by_subdomain
from app.core.tenant_db import tenant_db_manager
from app.db.session import get_db

class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Skip tenant middleware for tenant management endpoints
        if request.url.path.startswith("/api/v1/tenants"):
            return await call_next(request)
            
        # Extract tenant from subdomain or header
        tenant_id = request.headers.get("X-Tenant-ID")
        if tenant_id:
            # Get tenant from database
            db = next(get_db())
            try:
                tenant = get_tenant_by_subdomain(db, tenant_id)
                # Add tenant info to request state
                request.state.tenant = tenant
                request.state.tenant_db = tenant_db_manager.get_tenant_session(tenant.db_name)
            except Exception as e:
                # Log the error and continue with default database
                print(f"Error setting up tenant context: {str(e)}")
                request.state.tenant = None
                request.state.tenant_db = None
            finally:
                db.close()
        
        response = await call_next(request)
        return response
