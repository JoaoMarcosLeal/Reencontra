import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from src.main import app
from src.database import Base
from src.routes.items import get_db as items_get_db
from src.routes.users import get_db as users_get_db
from src.auth import get_db as auth_get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_items.sqlite3"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
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


app.dependency_overrides[items_get_db] = override_get_db
app.dependency_overrides[users_get_db] = override_get_db
app.dependency_overrides[auth_get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True)
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    yield

    Base.metadata.drop_all(bind=engine)

    app.dependency_overrides.clear()


def criar_usuario_e_token():
    client.post(
        "/users/register",
        json={
            "full_name": "Teste",
            "email": "teste@teste.com",
            "password": "123456",
        },
    )

    response = client.post(
        "/users/login",
        data={
            "username": "teste@teste.com",
            "password": "123456",
        },
    )

    token = response.json()["access_token"]

    return {
        "Authorization": f"Bearer {token}"
    }


def test_create_item():
    headers = criar_usuario_e_token()

    response = client.post(
        "/items/",
        json={
            "title": "Chaves Perdidas",
            "description": "Chaveiro de couro",
            "category": "Chaves",
            "location": "Praça Central",
            "is_found": False,
            "contact": "@teste",
        },
        headers=headers,
    )

    assert response.status_code == 200

    data = response.json()

    assert data["item"]["title"] == "Chaves Perdidas"
    assert data["item"]["category"] == "Chaves"
    assert data["item"]["contact"] == "@teste"


def test_list_items():
    headers = criar_usuario_e_token()

    client.post(
        "/items/",
        json={
            "title": "Notebook",
            "description": "Dell Inspiron",
            "category": "Eletrônicos",
            "location": "Biblioteca",
            "is_found": False,
            "contact": "@teste",
        },
        headers=headers,
    )

    response = client.get("/items/")

    assert response.status_code == 200

    data = response.json()

    assert len(data) > 0
    assert any(
    item["title"] == "Notebook"
    for item in data
)

def test_get_item():
    headers = criar_usuario_e_token()

    create_response = client.post(
        "/items/",
        json={
            "title": "Notebook",
            "description": "Dell",
            "category": "Eletrônicos",
            "location": "Biblioteca",
            "is_found": False,
            "contact": "@teste",
        },
        headers=headers,
    )

    item_id = create_response.json()["item"]["id"]

    response = client.get(f"/items/{item_id}")

    assert response.status_code == 200
    assert response.json()["title"] == "Notebook"

def test_get_item_not_found():
    response = client.get("/items/999")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"

def test_update_item():
    headers = criar_usuario_e_token()

    create_response = client.post(
        "/items/",
        json={
            "title": "Notebook",
            "description": "Dell",
            "category": "Eletrônicos",
            "location": "Biblioteca",
            "is_found": False,
            "contact": "@teste",
        },
        headers=headers,
    )

    item_id = create_response.json()["item"]["id"]

    response = client.put(
        f"/items/{item_id}",
        json={
            "title": "Notebook Atualizado",
            "description": "Dell Novo",
            "category": "Eletrônicos",
            "location": "Cantina",
            "is_found": True,
            "contact": "@novo",
        },
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["title"] == "Notebook Atualizado"

def test_delete_item():
    headers = criar_usuario_e_token()

    create_response = client.post(
        "/items/",
        json={
            "title": "Notebook",
            "description": "Dell",
            "category": "Eletrônicos",
            "location": "Biblioteca",
            "is_found": False,
            "contact": "@teste",
        },
        headers=headers,
    )

    item_id = create_response.json()["item"]["id"]

    response = client.delete(
        f"/items/{item_id}",
        headers=headers,
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Item deleted successfully"