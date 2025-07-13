from sqlalchemy import Column, Integer, String, Date, ForeignKey
from app.models.base import Base

class TravelRequest(Base):
    __tablename__ = "travel_requests"

    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String, nullable=False)
    travel_date = Column(Date, nullable=False)
    user_email = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    num_persons = Column(Integer, nullable=True)
