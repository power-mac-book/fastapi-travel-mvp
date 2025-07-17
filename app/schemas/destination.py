from pydantic import BaseModel
from typing import Optional, List

class DestinationBase(BaseModel):
    name: str
    description: str | None = None

class DestinationCreate(DestinationBase):
    itinerary: Optional[str] = None
    highlights: Optional[List[str]] = []
    inclusions: Optional[str] = None
    exclusions: Optional[str] = None
    gallery: Optional[List[str]] = []
    image_path: str | None = None

class DestinationOut(DestinationBase):
    id: int
    image_path: str | None = None
    itinerary: Optional[str] = None
    highlights: Optional[List[str]] = []
    inclusions: Optional[str] = None
    exclusions: Optional[str] = None
    gallery: Optional[List[str]] = []

    class Config:
        orm_mode = True
