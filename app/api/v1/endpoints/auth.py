from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest, TokenResponse
from app.db.session import get_db
from app.services.auth_services import authenticate_admin_user, generate_token


router = APIRouter()

@router.post("/login", response_model=TokenResponse, tags=["Auth"])
def admin_login(request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_admin_user(db, request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = generate_token(user.id)
    return {"access_token": token, "token_type": "bearer"}





