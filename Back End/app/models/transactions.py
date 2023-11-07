from sqlalchemy import Column, Integer, String, DateTime
from database import Base
from pydantic import BaseModel, Field

#Table declaration for Transaction
class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    direction = Column(String(45))
    item_id = Column(Integer)
    count = Column(Integer)
    timestamp = Column(DateTime)

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