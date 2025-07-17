from sqlalchemy import Column, Integer, String, Text, ARRAY
from sqlalchemy.dialects.postgresql import ARRAY as PG_ARRAY  # If using PostgreSQL
from app.models.base import Base

class Destination(Base):
    __tablename__ = "destinations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    image_path = Column(String) 
    itinerary = Column(Text)  # Rich text
    highlights = Column(PG_ARRAY(String))  # List of bullet points
    inclusions = Column(Text)  # Rich text
    exclusions = Column(Text)  # Rich text
    gallery = Column(PG_ARRAY(String))  # Store image filenames
