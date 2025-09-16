from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class AdminUserBase(BaseModel):
    email: EmailStr
    is_superadmin: bool = False

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserResponse(AdminUserBase):
    id: int
    tenant_id: Optional[int]

    class Config:
        orm_mode = True

class TenantCreate(BaseModel):
    name: str
    subdomain: str
    admin_email: EmailStr  # Email for the tenant's first admin
    admin_password: str    # Password for the tenant's first admin

class TenantUpdate(BaseModel):
    name: Optional[str] = None
    subdomain: Optional[str] = None
    is_active: Optional[bool] = None

class TenantResponse(BaseModel):
    id: int
    name: str
    subdomain: str
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime]
    admin_users: List[AdminUserResponse] = []

    class Config:
        orm_mode = True
