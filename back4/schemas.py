from pydantic import BaseModel
from datetime import datetime

# User Schema
class UserCreate(BaseModel):
    username: str
    password: str  # Removed email

class UserResponse(BaseModel):
    id: int
    username: str  # Removed email

    class Config:
        orm_mode = True

# Post Schema


# ✅ Create Post Schema (Request)
class PostCreate(BaseModel):
    title: str
    content: str

# ✅ Post Response Schema (Include Timestamps & Author)
class PostResponse(BaseModel):
    id: int
    title: str
    content: str
    created_at: datetime  # ✅ Include timestamps
    updated_at: datetime
    author: UserResponse   # ✅ Return author's username instead of ID

    class Config:
        orm_mode = True