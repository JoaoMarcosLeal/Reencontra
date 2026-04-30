from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Item
from ..services.match_service import run_match

router = APIRouter(prefix="/items")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def create_item(
    title: str,
    description: str,
    category: str,
    location: str,
    is_found: bool,
    owner_id: int,
    db: Session = Depends(get_db)
):
    item = Item(
        title=title,
        description=description,
        category=category,
        location=location,
        is_found=is_found,
        owner_id=owner_id
    )

    db.add(item)
    db.commit()

    # roda match async simples
    run_match(item, db)

    return item

@router.get("/")
def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()