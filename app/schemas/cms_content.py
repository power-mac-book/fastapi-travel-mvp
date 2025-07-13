from pydantic import BaseModel
from typing import Optional

class CMSContentCreate(BaseModel):
    title: str
    content: str
    section_type: str

class CMSContentOut(CMSContentCreate):
    id: int

    class Config:
        orm_mode = True
