from fastapi import FastAPI
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