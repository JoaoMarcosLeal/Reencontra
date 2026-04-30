from ..models import Item

def run_match(new_item, db):
    if new_item.is_found:
        candidates = db.query(Item).filter(Item.is_found == False).all()
    else:
        candidates = db.query(Item).filter(Item.is_found == True).all()

    matches = []

    for item in candidates:
        if (
            item.category == new_item.category and
            new_item.description.lower() in item.description.lower()
        ):
            matches.append(item)

    if matches:
        print("MATCH ENCONTRADO:")
        for m in matches:
            print(f"- Item {m.id} pode corresponder com {new_item.id}")