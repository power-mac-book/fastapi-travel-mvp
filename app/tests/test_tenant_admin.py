from sqlalchemy.orm import Session
from app.models.tenant import Tenant
from app.models.admin_user import AdminUser
from app.core.security import get_password_hash
from app.db.session import get_db

def test_tenant_admin_relationship():
    """Test function to verify tenant-admin relationships"""
    db = next(get_db())
    try:
        # 1. Create a test tenant
        test_tenant = Tenant(
            name="Test Company",
            subdomain="test-company",
            db_name="tenant_test_company",
            is_active=True
        )
        db.add(test_tenant)
        db.commit()
        db.refresh(test_tenant)
        print(f"✅ Created tenant: {test_tenant.name} (ID: {test_tenant.id})")

        # 2. Create an admin user
        admin = AdminUser(
            email="admin@testcompany.com",
            password_hash=get_password_hash("password123"),
            tenant_id=test_tenant.id,
            is_superadmin=False
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print(f"✅ Created admin user: {admin.email} (ID: {admin.id})")

        # 3. Verify the relationship from admin to tenant
        print("\nVerifying admin → tenant relationship:")
        print(f"Admin's tenant ID: {admin.tenant_id}")
        print(f"Admin's tenant name: {admin.tenant.name}")

        # 4. Verify the relationship from tenant to admin
        print("\nVerifying tenant → admin relationship:")
        print(f"Tenant's admin count: {len(test_tenant.admin_users)}")
        for admin_user in test_tenant.admin_users:
            print(f"- Admin user: {admin_user.email}")

        return True

    except Exception as e:
        print(f"❌ Error during test: {str(e)}")
        db.rollback()
        return False

    finally:
        db.close()

if __name__ == "__main__":
    success = test_tenant_admin_relationship()
    print(f"\nTest {'succeeded' if success else 'failed'}")
