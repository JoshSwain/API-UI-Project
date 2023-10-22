from sqlalchemy import Boolean, Column, Integer, String, Float, Double, DateTime
from database import Base, engine
from pydantic import BaseModel, Field

#Table declaration for Item and Transaction
class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    price = Column(Double)
    category = Column(String(50))

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    direction = Column(String(45))
    item_id = Column(Integer)
    count = Column(Integer)
    timestamp = Column(DateTime)

#Creates the tables if they don't exist already
Base.metadata.create_all(bind=engine)

#Data validation for item inputs
class ItemBase(BaseModel):
    name: str
    price: float
    category: str = Field(..., pattern='^(beverages|sandwiches)$')

class UpdateItemBase(BaseModel):
    name: str | None
    price: float | None
    category: str | None

class ItemModel(ItemBase):
    id: int
    category: str
    class Config:
        from_attributes = True

#Data validation for transaction inputs
class TransactionBase(BaseModel):
    count: int
    direction: str = Field(..., pattern='^(Sale|Restock)$')
    item_id: int

class TransactionModel(TransactionBase):
    id: int
    direction: str
    class Config:
        from_attributes = True