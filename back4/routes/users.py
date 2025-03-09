from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import User
from schemas import UserCreate, UserResponse
from database import get_db
from dependencies import hash_password, verify_password, create_access_token
from datetime import timedelta
from pydantic import BaseModel

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if a user with the same username already exists
    user = db.query(User).filter(User.username == user_data.username).first()
    if user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_pw = hash_password(user_data.password)
    new_user = User(username=user_data.username, password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# ✅ Define LoginRequest and USE it in signin function
class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/signin")
def signin(user_data: LoginRequest, db: Session = Depends(get_db)):
    """Signin endpoint now correctly receives JSON request body"""
    user = db.query(User).filter(User.username == user_data.username).first()
    if not user or not verify_password(user_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    token = create_access_token({"user_id": user.id}, timedelta(minutes=30))
    return {"token": token, "user_id": user.id, "username": user.username}
