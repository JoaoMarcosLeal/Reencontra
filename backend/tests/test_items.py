import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, StaticPool
from sqlalchemy.orm import sessionmaker
from src.main import app
from src.database import Base
from src.routes.items import get_db

# Configuração do banco em memória com StaticPool
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(name="session", autouse=True)
def session_fixture():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


def test_create_item():
    # Dados para a criação do item
    payload = {
        "title": "Chaves Perdidas",
        "description": "Chaveiro de couro com 3 chaves",
        "category": "Objetos",
        "location": "Praça central",
        "is_found": False,
        "owner_id": 1,
    }

    # Fazendo o POST usando query params (conforme definido na sua função create_item)
    response = client.post("/items/", params=payload)

    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Chaves Perdidas"
    assert data["owner_id"] == 1
    assert "id" in data


def test_list_items():
    # Primeiro, criamos um item para garantir que a lista não esteja vazia
    client.post(
        "/items/",
        params={
            "title": "Dog perdido",
            "description": "Golden Retriever",
            "category": "Pets",
            "location": "Bairro Sul",
            "is_found": False,
            "owner_id": 2,
        },
    )

    response = client.get("/items/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    assert data[0]["title"] == "Dog perdido"
