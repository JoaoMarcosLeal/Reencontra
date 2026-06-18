from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import User

SECRET_KEY = "super_secret_key"
ALGORITHM = "HS256"

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="users/login"
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


def hash_password(password: str):

    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )


def create_access_token(data: dict):

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=2)
    to_encode.update({
        "exp": expire
    })
    encoded_jwt = jwt.encode( to_encode, SECRET_KEY, algorithm=ALGORITHM )

    return encoded_jwt


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token"
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(
        User.email == email
    ).first()

    if user is None:
        raise credentials_exception

    return user