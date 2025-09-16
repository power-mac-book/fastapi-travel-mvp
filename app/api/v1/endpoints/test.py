from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.tests.test_tenant_admin import test_tenant_admin_relationship

router = APIRouter()

@router.post("/test-tenant-admin")
def run_tenant_admin_test(db: Session = Depends(get_db)):
    """Endpoint to run the tenant-admin relationship test"""
    success = test_tenant_admin_relationship()
    if not success:
        raise HTTPException(status_code=500, detail="Test failed")
    return {"message": "Test completed successfully"}
