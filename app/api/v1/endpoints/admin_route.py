from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserCreate, AdminUserOut
from app.core.security import hash_password
from app.db.session import get_db

router = APIRouter()

@router.post("/admin/register", response_model=AdminUserOut, tags=["Admin Auth"])
def register_admin(admin_data: AdminUserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(AdminUser).filter(AdminUser.email == admin_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Admin user already exists.")
    
    admin_user = AdminUser(
        email=admin_data.email,
        password_hash=hash_password(admin_data.password)
    )
    db.add(admin_user)
    db.commit()
    db.refresh(admin_user)
    return admin_user
