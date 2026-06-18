from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .routes.users import router as users_router
from .routes.items import router as items_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Reencontra UFLA")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {"message": "API running"}


app.include_router(users_router)

app.include_router(items_router)
