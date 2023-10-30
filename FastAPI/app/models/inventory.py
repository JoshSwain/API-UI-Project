from sqlalchemy import Boolean, Column, Integer, String, Float, Double, DateTime
from database import Base
from pydantic import BaseModel

#Table declaration for Inventory
class Inventory(Base):
    __tablename__ = 'inventory'

    item_id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer)

#Data validation for item inputs
class InventoryBase(BaseModel):
    item_id: int
    quantity: int

class UpdateInventoryBase(BaseModel):
    quantity: int

class InventoryModel(InventoryBase):
    item_id: int
    quantity: int
    class Config:
        from_attributes = True