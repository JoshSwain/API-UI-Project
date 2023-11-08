from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from pydantic import BaseModel, Field

#Table declaration for Transaction
class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    direction = Column(String(45))
    item_id = Column(Integer, ForeignKey("items.id"))
    count = Column(Integer)
    timestamp = Column(DateTime)
    # items = relationship("Item", back_populates="transasctions")


#Data validation for transaction inputs
class TransactionBase(BaseModel):
    count: int
    direction: str = Field(..., pattern='^(Sale|Restock)$')
    item_id: int

class TransactionModel(TransactionBase):
    id: int
    item_id: int
    class Config:
        from_attributes = True