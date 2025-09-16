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
    travel_date: date
    num_persons: int

    class Config:
        orm_mode = True

class PaginatedTravelResponse(BaseModel):
    requests: list[TravelRequestOut]
    total: int
    page: int
    limit: int
