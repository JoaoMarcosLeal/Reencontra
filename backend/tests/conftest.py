from src.main import app
import pytest

@pytest.fixture(autouse=True)
def limpar_overrides():
    app.dependency_overrides.clear()

    yield

    app.dependency_overrides.clear()