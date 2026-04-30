from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET = "secret"

pwd_context = CryptContext(schemes=["bcrypt"])

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(password, hashed):
    return pwd_context.verify(password, hashed)

def create_token(data: dict):
    data["exp"] = datetime.utcnow() + timedelta(hours=2)
    return jwt.encode(data, SECRET, algorithm="HS256")