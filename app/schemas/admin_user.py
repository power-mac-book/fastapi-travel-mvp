from pydantic import BaseModel

class AdminUserCreate(BaseModel):
    email: str
    password: str

class AdminUserOut(BaseModel):
    id: int
    email: str

    class Config:
        orm_mode = True
