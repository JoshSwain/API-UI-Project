from sqlalchemy import Boolean, Column, Integer, String, Float, Double, DateTime
from database import Base
from pydantic import BaseModel, Field

#Table declaration for Item
class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    price = Column(Double)
    category = Column(String(50))

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