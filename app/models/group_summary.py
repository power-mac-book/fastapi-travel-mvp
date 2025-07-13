from sqlalchemy import Column, Integer, String, Date
from app.models.base import Base

class TravelGroupSummary(Base):
    __tablename__ = "travel_group_summary"

    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String, nullable=False)
    travel_date = Column(Date, nullable=False)
    user_count = Column(Integer, nullable=False)
