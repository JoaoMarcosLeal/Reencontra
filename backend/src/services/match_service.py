from difflib import SequenceMatcher
from ..models import Item

def similarity(a: str, b: str):

    return SequenceMatcher(
        None,
        a.lower(),
        b.lower()
    ).ratio()


def run_match(new_item, db):

    items = db.query(Item).filter(
        Item.is_found != new_item.is_found
    ).all()

    matches = []

    for item in items:

        if item.category != new_item.category:
            continue

        description_similarity = similarity(
            item.description,
            new_item.description
        )

        title_similarity = similarity(
            item.title,
            new_item.title
        )

        final_score = (
            description_similarity +
            title_similarity
        ) / 2

        if final_score >= 0.7:

            matches.append({
                "item_id": item.id,
                "score": round(final_score, 2)
            })

    return matches
