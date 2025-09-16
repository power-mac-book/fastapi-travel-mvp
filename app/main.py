from fastapi import FastAPI
from app.api.v1.router import api_router
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.middleware.tenant import TenantMiddleware
import os

app = FastAPI(title="SmartGroup Travel MVP")  # ✅ This must come before decorators


# 👇 Serve static files from the "app/uploads" directory at "/uploads"
uploads_path = os.path.join(os.path.dirname(__file__), "uploads")
app.mount("/uploads", StaticFiles(directory=uploads_path), name="uploads")

@app.on_event("startup")
def startup():
    init_db()

@app.get("/healthz")
def health_check():
    return {"status": "ok"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "http://localhost:5173"],  # or ["*"] for quick dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*", "X-Tenant-ID"],
)

# Add tenant middleware
app.add_middleware(TenantMiddleware)

app.include_router(api_router, prefix="/api/v1")


