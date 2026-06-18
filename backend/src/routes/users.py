from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import User
from ..schemas import UserRegister
from fastapi.security import OAuth2PasswordRequestForm
from ..auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/register")
def register(
    user_data: UserRegister,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        password=hash_password(user_data.password)
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {
        "message": "User created successfully",
        "user_id": user.id
    }


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    password_is_valid = verify_password(
        form_data.password,
        user.password
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    
    access_token = create_access_token(
    data={"sub": user.email}
)

    return {
    "access_token": access_token,
    "token_type": "bearer",
    "user": {
        "id": user.id,
        "name": user.full_name,
        "email": user.email
    }
}