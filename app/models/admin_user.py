from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base

class AdminUser(Base):
    __tablename__ = "admin_users"
    __table_args__ = {'extend_existing': True}

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    tenant_id = Column(Integer, ForeignKey("tenants.id", ondelete="CASCADE"), nullable=True)
    is_superadmin = Column(Boolean, default=False)
    
    # Relationship to tenant
    tenant = relationship(
        "Tenant",
        back_populates="admin_users",
        foreign_keys=[tenant_id]
    )
