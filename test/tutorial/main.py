from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum


app = FastAPI()

# Categories used to describe items, used Enum package to keep constants organized and provide data validation.
class Category(Enum):
    SANDWICHES = 'sandwiches'
    BEVERAGES = 'beverages'

# Details related to the store items, used pydantic's BaseModel to simplify the classes, parse with FastAPI, and provide data validations well.
class Item(BaseModel):
    name: str
    price: float
    count: int
    id: int
    category: Category


# Store items and their details, this should be a SQL database
items = {
    0: Item(name="Grinder", price=9.99, count=20, id=0, category=Category.SANDWICHES),
    1: Item(name="Sausage Egg and Cheese", price=5.99, count=40, id=1, category=Category.SANDWICHES),
    2: Item(name="Iced Coffee", price=4.99, count=30, id=0, category=Category.BEVERAGES)
}

# API Routing, get all items
@app.get("/")
def index() -> dict[str, dict[int, Item]]:
    return {"items": items}

# Routing by Item ID
@app.get("/items/{item_id}")
def query_item_by_id(item_id: int) -> Item:
    if item_id not in items:
        raise HTTPException(
            status_code=404, detail=f"Item with ID '{item_id}' was not found"
        )
    return items[item_id]


# Type hints for querying item by parameter
selector = dict[str, str | float | int | Category | None]

# Router for querying items by parameters
@app.get("/items/")
def query_item_by_param(
    name: str | None = None,
    price: float | None = None,
    count: int | None = None,
    category: Category | None = None,
) -> dict[str, selector | list[Item]]:

    # Function to check each parameter
    def check_item(item: Item) -> bool:
        return all(
            (
                name is None or name == item.name,
                price is None or price == item.price,
                count is None or count == item.count,
                category is None or category is item.category
            )
        )
    # Iterates through items and returns adds matches to list 'selection'
    selection = [item for item in items.values() if check_item(item)]
    return {
        "query": {"name": name, "price": price, "count": count, "category": category},
        "selection": selection
    }

# Router to add a new item


@app.post("/")
def add_item(item: Item) -> dict[str, Item]:

    if item.id in items:
        raise HTTPException(
            status_code=400, detail=f"Item with ID {item.id} already exists"
        )
    items[item.id] = item
    return {"added": item}

# Router to update an item


@app.put("/update/{item_id}")
def update_item(
    item_id: int,
    name: str | None = None,
    price: float | None = None,
    count: int | None = None,
) -> dict[str, Item]:
    if item_id not in items:
        raise HTTPException(
            status_code=404, detail=f"Item with ID {item_id} does not exist"
        )
    if all(info is None for info in (name, price, count)):
        raise HTTPException(
            status_code=400, detail="No parameters provided."
        )

    item = items[item_id]
    if name is not None:
        item.name = name
    if price is not None:
        item.price = price
    if count is not None:
        item.count = count

    return {"updated": item}

# Router to delete items by ID


@app.delete("/delete/{item_id}")
def delete_item(item_id: int) -> dict[str, Item]:
    if item_id not in items:
        raise HTTPException(
            status_code=404, detail=f"Item with id '{item_id}' not found"
        )
    item = items.pop(item_id)
    return {"deleted": item}
