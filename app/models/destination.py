from sqlalchemy import Column, Integer, String, Text
from app.models.base import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    image_path = Column(String, nullable=True)  # Local image file path
