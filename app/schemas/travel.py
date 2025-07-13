from pydantic import BaseModel, EmailStr
from datetime import date

class TravelRequestCreate(BaseModel):
    destination: str
    travel_date: date
    user_email: EmailStr
    phone_number: str | None = None
    num_persons: int | None = None

class TravelRequestOut(TravelRequestCreate):
    id: int

    class Config:
        orm_mode = True
