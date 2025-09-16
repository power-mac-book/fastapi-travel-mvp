from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.core.redis_client import redis_client

# JWT Configuration
SECRET_KEY = "your_secret_key_here"  # Use env var in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 1 day

security = HTTPBearer()

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def blacklist_token(token: str):
    """Add token to blacklist in Redis"""
    redis_client.sadd("token_blacklist", token)
    redis_client.expire("token_blacklist", 60*60*24)  # expire after 24 hours

def is_token_blacklisted(token: str) -> bool:
    """Check if a token is blacklisted"""
    return redis_client.sismember("token_blacklist", token)

async def verify_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    try:
        token = credentials.credentials
        if is_token_blacklisted(token):
            raise HTTPException(
                status_code=401,
                detail="Token has been invalidated"
            )
            
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if datetime.fromtimestamp(payload.get("exp")) < datetime.utcnow():
            raise HTTPException(
                status_code=401,
                detail="Token has expired"
            )
        return payload
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )
