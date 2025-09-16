from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.tenant import TenantCreate, TenantResponse, TenantUpdate
from app.services.tenant_service import create_tenant, get_tenant_by_subdomain, list_tenants, update_tenant
from typing import List
from app.core.security import verify_token

router = APIRouter()

@router.post("/", response_model=TenantResponse)
async def create_new_tenant(
    tenant: TenantCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """Create a new tenant (Super Admin only)"""
    return create_tenant(db, tenant)

@router.get("/", response_model=List[TenantResponse])
async def get_tenants(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """List all tenants (Super Admin only)"""
    return list_tenants(db, skip=skip, limit=limit)

@router.get("/{subdomain}", response_model=TenantResponse)
async def get_tenant(
    subdomain: str,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """Get tenant details by subdomain"""
    return get_tenant_by_subdomain(db, subdomain)

@router.put("/{tenant_id}", response_model=TenantResponse)
async def update_tenant_details(
    tenant_id: int,
    tenant_update: TenantUpdate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    """Update tenant details (Super Admin only)"""
    return update_tenant(db, tenant_id, tenant_update)
