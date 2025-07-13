from pydantic import BaseModel

class DestinationBase(BaseModel):
    name: str
    description: str | None = None

class DestinationCreate(DestinationBase):
    image_path: str | None = None

class DestinationOut(DestinationBase):
    id: int
    image_path: str | None = None

    class Config:
        orm_mode = True
