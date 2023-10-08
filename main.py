from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from enum import Enum
from datetime import datetime

class Category(Enum):
    SANDWICHES = 'sandwiches'
    BEVERAGES = 'beverages'

class Direction(Enum):
    SALE = 'sale'
    RESTOCK = 'restock'

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

class ItemBase(BaseModel):
    name: str
    price: float
    count: int
    category: Category

class UpdateItemBase(BaseModel):
    name: str | None
    price: float | None
    count: int | None
    category: Category | None

class TransactionBase(BaseModel):
    count: int
    direction: Direction
    item_id: int

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemBase, db: db_dependency):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    return f'Item with ID {db_item.id} created.'

@app.get("/items/{item_id}", status_code=status.HTTP_200_OK)
async def read_item(item_id: int, db: db_dependency):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail='Item not found')
    return item

@app.put("/items/{item_id}", status_code=status.HTTP_200_OK)
async def update_item(item_id: int, item_update: UpdateItemBase, db: db_dependency):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail='Item not found') 
    for field, value in item_update.dict().items():
        if value is not None:
            setattr(db_item, field, value)

    db.commit()
    return f'Item with ID {db_item.id} updated.', db_item

@app.delete("/items/{item_id}", status_code=status.HTTP_200_OK)
async def delete_item(item_id: int, db: db_dependency):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail='Item not found')
    db.delete(db_item)
    db.commit()

@app.post("/transactions/", status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db_item = db.query(models.Item).filter(models.Item.id == db_transaction.item_id).first()
    db_transaction.timestamp = datetime.now()
    db_transaction.total_cost = db_transaction.count * db_item.price
    new_count = None
    direction_string = None
    if db_transaction.direction == Direction.SALE:
        new_count = db_item.count - db_transaction.count
        direction_string = 'Sale'
        if new_count < 0:
            raise HTTPException(status_code=403, detail= f'Insufficient inventory for purchase, please restock, current inventory: {db_item.count}.')
    elif db_transaction.direction == Direction.RESTOCK:
        direction_string = 'Restock'
        new_count = db_item.count + db_transaction.count

    if new_count is not None:
        item_update = {
            "name": None,
            "price": None,
            "count": new_count,
            "category": None,
        }
        await update_item(db_item.id, UpdateItemBase(**item_update), db)
    db.add(db_transaction)
    db.commit()
    return f'{direction_string} of {db_item.name} completed successfully, new inventory is {db_item.count}'

@app.get("/transactions/{transaction_id}", status_code=status.HTTP_200_OK)
async def read_transaction(transaction_id: int, db: db_dependency):
    transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if transaction is None:
        raise HTTPException(status_code=404, detail='Transaction not found')
    return transaction

@app.delete("/transactions/{transaction_id}", status_code=status.HTTP_200_OK)
async def delete_transaction(transaction_id: int, db: db_dependency):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).first()
    if db_transaction is None:
        raise HTTPException(status_code=404, detail='Transaction not found')
    db.delete(db_transaction)
    db.commit()
    return f'Deletion of transaction (ID: {db_transaction.id}) of completed successfully.'
