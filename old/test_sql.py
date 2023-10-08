from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from enum import Enum
import pypyodbc as odbc
import pandas as pd

DRIVER_NAME = 'SQL SERVER'
SERVER_NAME = 'DESKTOP-LP4V664\MSSQLSERVER01'
DATABASE_NAME = 'DelightfulDeli'

connection_string = f"""
    DRIVER={{{DRIVER_NAME}}};
    SERVER={SERVER_NAME};
    
"""
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
    2: Item(name="Iced Coffee", price=4.99, count=30, id=2, category=Category.BEVERAGES)
}
conn = odbc.connect(connection_string)

print(conn)

cursor = conn.cursor()

#print(cursor.execute("SELECT * FROM DelightfulDeli.dbo.Sheet1$"))

data = pd.read_sql("SELECT * FROM DelightfulDeli.dbo.Sheet1$", conn)
print(data)

items = {}

def df_to_dict(row):
    item = {
        "name": row["name"],
        "price": row["price"],
        "count": row["count"],
        "id": row["id"],
        "category": row["category"]
    }
    items[row["id"]] = Item(**item)

data.apply(df_to_dict, axis=1)
print(items)