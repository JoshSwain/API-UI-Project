from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel

#Table declaration for Inventory
class Inventory(Base):
    __tablename__ = 'inventory'

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"))
    quantity = Column(Integer)
    items = relationship("Item", back_populates="inventory")


#Data validation for item inputs
#SCHEMAS
class InventoryBase(BaseModel):
    item_id: int
    quantity: int

class UpdateInventoryBase(BaseModel):
    quantity: int

class InventoryModel(InventoryBase):
    item_id: int
    id: int
    class Config:
        from_attributes = True