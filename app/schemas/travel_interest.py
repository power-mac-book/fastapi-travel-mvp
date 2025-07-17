from pydantic import BaseModel
from datetime import date

class TravelInterestDateOut(BaseModel):
    travel_date: date

    class Config:
        orm_mode = True
