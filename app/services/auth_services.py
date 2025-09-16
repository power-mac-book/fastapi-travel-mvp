from sqlalchemy.orm import Session
from app.models.admin_user import AdminUser
from app.core.security import verify_password
from app.core.token import create_access_token, blacklist_token, is_token_blacklisted
from datetime import timedelta

def authenticate_admin_user(db: Session, email: str, password: str):
    user = db.query(AdminUser).filter(AdminUser.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user

def generate_token(user_id: int):
    return create_access_token(
        {"sub": str(user_id)},
        expires_delta=timedelta(minutes=60*24)
    )
