from app.models.base import Base
from sqlalchemy import Column, Integer, String, Text

class CMSContent(Base):
    __tablename__ = "cms_content"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=True)
    section_type = Column(String, nullable=True)