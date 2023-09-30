from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum


app = FastAPI()

#Categories used to describe items
class Category(Enum):
    SANDWICHES = 'sandwiches'
    BEVERAGES = 'beverages'

#Details related to the store items
class Item(BaseModel):
    name: str
    price: float
    count: int
    id: int
    category: Category

#Store items and their details, this should be a SQL database
items = {
    0: Item(name="Grinder", price = 9.99, count = 20, id=0, category=Category.SANDWICHES),
    1: Item(name="Sausage Egg and Cheese", price = 5.99, count = 40, id=1, category=Category.SANDWICHES),
    2: Item(name="Iced Coffee", price = 4.99, count = 30, id=0, category=Category.BEVERAGES)
    
}

#API Routing
@app.get("/")
def index() -> dict[str, dict[int, Item]]:
    return {"items": items}

#Routing by Item ID
@app.get("/items/{item_id}")
def query_item_by_id(item_id: int) -> Item:
    if item_id not in items:
        raise HTTPException(
            status_code=404, detail=f"Item with ID '{item_id}' was not found"
        )
    return items[item_id]


Selector = dict[
    str, str | float | int | Category | None
] 

@app.get("/items/")
def query_item_by_param(
    name: str | None = None, 
    price: float | None = None, 
    count: int | None = None, 
    category: Category | None = None,
) -> dict[str, Selector | list[Item]]: 
    def check_item(item: Item) -> bool:
        return all(
            (
                name is None or name==item.name,
                price is None or price==item.price,
                count is None or count==item.count,
                category is None or category is item.category
            )
        )
    selection = [item for item in items.values() if check_item(item)]
    return {
        "query": {"name":name, "price": price, "count": count, "category": category},
        "selection": selection
    }

@app.post("/")
def add_item(item: Item) -> dict[str, Item]:
    
    if item.id in items:
        raise HTTPException(
            status_code=400, detail=f"Item with ID {item.id} already exists"
        )
    items[item.id] = item
    return {"added": item}
