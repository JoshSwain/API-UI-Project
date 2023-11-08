from sqlalchemy import Boolean, Column, Integer, String, Float, Double, DATETIME
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel, Field
from models.inventory import InventoryModel
from models.transactions import TransactionModel


#Table declaration for Item
class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    price = Column(Double)
    category = Column(String(50))
    inventory = relationship("Inventory", back_populates="items")
    # transactions = relationship("Transaction", back_populates="transaction")

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
    inventory: list[InventoryModel] = []
    # transactions: list[TransactionModel] = []
    class Config:
        from_attributes = True