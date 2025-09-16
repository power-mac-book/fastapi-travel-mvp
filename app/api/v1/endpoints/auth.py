from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest, TokenResponse
from app.db.session import get_db
from app.services.auth_services import authenticate_admin_user, generate_token
from app.core.token import blacklist_token
from typing import Optional


router = APIRouter()

@router.post("/login", response_model=TokenResponse, tags=["Auth"])
def admin_login(request: LoginRequest, db: Session = Depends(get_db)):
    user = authenticate_admin_user(db, request.email, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = generate_token(user.id)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/logout", tags=["Auth"])
def logout(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")
    
    try:
        # Extract token from "Bearer <token>"
        token = authorization.split(" ")[1]
        blacklist_token(token)
        return {"message": "Successfully logged out"}
    except IndexError:
        raise HTTPException(status_code=401, detail="Invalid token format")