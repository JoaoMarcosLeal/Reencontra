from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    class Config:
        from_attributes = True


class ItemCreate(BaseModel):
    title: str
    description: str
    category: str
    location: str
    is_found: bool


class ItemUpdate(BaseModel):
    title: str
    description: str
    category: str
    location: str
    is_found: bool


class ItemResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    location: str
    is_found: bool
    created_at: datetime
    owner_id: int
    class Config:
        from_attributes = True