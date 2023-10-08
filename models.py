from sqlalchemy import Boolean, Column, Integer, String, Float, Double, DateTime
from database import Base


class Item(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True)
    price = Column(Double)
    count = Column(Integer)
    category = (Column(String(50)))

class Transaction(Base):
    __tablename__ = 'transactions'

    id = Column(Integer, primary_key=True, index=True)
    direction = Column(String(45))
    item_id = Column(Integer)
    count = Column(Integer)
    total_cost = Column(Double)
    timestamp = Column(DateTime)