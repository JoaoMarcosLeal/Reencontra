import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from src.main import app
from src.database import Base
from src.routes.users import get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_db.sqlite3"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

# Setup da aplicação
client = TestClient(app)


@pytest.fixture(name="session_fixture")
def session_fixture():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_register_user(session_fixture):
    response = client.post(
        "/users/register",
        params={"email": "paul@example.com", "password": "yesterday"},
    )
    assert response.status_code == 200
    assert response.json() == {"msg": "User created"}


def test_login_success(session_fixture):
    # Primeiro, registra o usuário
    client.post(
        "/users/register",
        params={"email": "fagen@example.com", "password": "aja"},
    )

    # Tenta fazer login
    response = client.post(
        "/users/login",
        params={"email": "fagen@example.com", "password": "aja"},
    )
    assert response.status_code == 200
    assert "token" in response.json()


def test_login_invalid_credentials(session_fixture):
    # Tenta login com usuário que não existe
    response = client.post(
        "/users/login",
        params={"email": "byrne@example.com", "password": "and_she_was"},
    )
    assert response.status_code == 200
    assert response.json() == {"error": "Invalid credentials"}

    # Registra e tenta com senha errada
    client.post(
        "/users/register",
        params={"email": "byrne@example.com", "password": "and_she_was"},
    )
    response = client.post(
        "/users/login",
        params={"email": "byrne@example.com", "password": "psycho_killer"},
    )
    assert response.status_code == 200
    assert response.json() == {"error": "Invalid credentials"}
