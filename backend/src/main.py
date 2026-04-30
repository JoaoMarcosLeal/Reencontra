from fastapi import FastAPI
from .database import Base, engine
from .routes import users, items

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(users.router)
app.include_router(items.router)

@app.get("/")
def root():
    return {"msg": "API running"}