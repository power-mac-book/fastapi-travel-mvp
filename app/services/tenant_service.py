from sqlalchemy.orm import Session
from app.models.tenant import Tenant
from app.schemas.tenant import TenantCreate, TenantUpdate
from app.core.tenant_db import tenant_db_manager
from fastapi import HTTPException
import re

def create_tenant(db: Session, tenant: TenantCreate) -> Tenant:
    # Validate and normalize subdomain
    subdomain = normalize_subdomain(tenant.subdomain)
    
    # Check if tenant already exists
    if db.query(Tenant).filter(Tenant.subdomain == subdomain).first():
        raise HTTPException(status_code=400, detail="Subdomain already registered")
    
    # Create database name from subdomain
    db_name = f"tenant_{subdomain}"
    
    # Create the tenant database
    if not tenant_db_manager.create_tenant_database(db_name):
        raise HTTPException(status_code=500, detail="Failed to create tenant database")
    
    # Create tenant record
    db_tenant = Tenant(
        name=tenant.name,
        subdomain=subdomain,
        db_name=db_name
    )
    
    db.add(db_tenant)
    db.commit()
    db.refresh(db_tenant)
    
    return db_tenant

def get_tenant_by_subdomain(db: Session, subdomain: str) -> Tenant:
    tenant = db.query(Tenant).filter(Tenant.subdomain == subdomain).first()
    if not tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    if not tenant.is_active:
        raise HTTPException(status_code=403, detail="Tenant is inactive")
    return tenant

def normalize_subdomain(subdomain: str) -> str:
    # Convert to lowercase and replace spaces with hyphens
    normalized = re.sub(r'[^a-zA-Z0-9]', '-', subdomain.lower())
    # Remove consecutive hyphens
    normalized = re.sub(r'-+', '-', normalized)
    # Remove leading and trailing hyphens
    normalized = normalized.strip('-')
    return normalized

def list_tenants(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Tenant).offset(skip).limit(limit).all()

def update_tenant(db: Session, tenant_id: int, tenant_update: TenantUpdate) -> Tenant:
    db_tenant = db.query(Tenant).filter(Tenant.id == tenant_id).first()
    if not db_tenant:
        raise HTTPException(status_code=404, detail="Tenant not found")
    
    update_data = tenant_update.dict(exclude_unset=True)
    
    if 'subdomain' in update_data:
        update_data['subdomain'] = normalize_subdomain(update_data['subdomain'])
    
    for field, value in update_data.items():
        setattr(db_tenant, field, value)
    
    db.commit()
    db.refresh(db_tenant)
    return db_tenant
