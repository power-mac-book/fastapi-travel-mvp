from pydantic import BaseModel
from datetime import date

class TravelGroupSummaryOut(BaseModel):
    destination: str
    travel_date: date
    user_count: int

    class Config:
        orm_mode = True
