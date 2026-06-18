import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.main import app
from src.database import Base
from src.routes.users import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.sqlite3"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

TestingSessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


client = TestClient(app)


@pytest.fixture(autouse=True)
def session_fixture():

    app.dependency_overrides[get_db] = override_get_db

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield

    Base.metadata.drop_all(bind=engine)

    app.dependency_overrides.clear()


def test_register_user():
    response = client.post(
        "/users/register",
        json={
            "full_name": "Paul Byrne",
            "email": "paul@example.com",
            "password": "yesterday",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["message"] == "User created successfully"
    assert "user_id" in data


def test_login_success():

    client.post(
        "/users/register",
        json={
            "full_name": "David Byrne",
            "email": "fagen@example.com",
            "password": "aja",
        },
    )

    response = client.post(
        "/users/login",
        data={
            "username": "fagen@example.com",
            "password": "aja",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "fagen@example.com"


def test_login_invalid_credentials():

    response = client.post(
        "/users/login",
        data={
            "username": "byrne@example.com",
            "password": "and_she_was",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"

    client.post(
        "/users/register",
        json={
            "full_name": "Byrne",
            "email": "byrne@example.com",
            "password": "and_she_was",
        },
    )

    response = client.post(
        "/users/login",
        data={
            "username": "byrne@example.com",
            "password": "senha_errada",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"


def test_register_duplicate_email():

    client.post(
        "/users/register",
        json={
            "full_name": "Teste",
            "email": "teste@email.com",
            "password": "123456",
        },
    )

    response = client.post(
        "/users/register",
        json={
            "full_name": "Outro",
            "email": "teste@email.com",
            "password": "654321",
        },
    )

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already exists"