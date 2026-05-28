from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Item
from ..schemas import (
    ItemCreate,
    ItemUpdate
)
from ..auth import get_current_user
from ..services.match_service import run_match

router = APIRouter(
    prefix="/items",
    tags=["Items"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db

    finally:
        db.close()


@router.post("/")
def create_item(
    item_data: ItemCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    item = Item(
        title=item_data.title,
        description=item_data.description,
        category=item_data.category,
        location=item_data.location,
        is_found=item_data.is_found,
        owner_id=current_user.id
    )

    db.add(item)

    db.commit()

    db.refresh(item)

    matches = run_match(item, db)

    return {
        "item": item,
        "matches": matches
    }


@router.get("/")
def list_items(
    db: Session = Depends(get_db)
):

    items = db.query(Item).all()

    return items


@router.get("/{item_id}")
def get_item(
    item_id: int,
    db: Session = Depends(get_db)
):

    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    return item


@router.put("/{item_id}")
def update_item(
    item_id: int,
    item_data: ItemUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    if item.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Permission denied"
        )

    item.title = item_data.title
    item.description = item_data.description
    item.category = item_data.category
    item.location = item_data.location
    item.is_found = item_data.is_found

    db.commit()

    db.refresh(item)

    return item


@router.delete("/{item_id}")
def delete_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    item = db.query(Item).filter(
        Item.id == item_id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Item not found"
        )

    if item.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Permission denied"
        )

    db.delete(item)

    db.commit()

    return {
        "message": "Item deleted successfully"
    }