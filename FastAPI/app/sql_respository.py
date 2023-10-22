from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from repository_interface import Repository
from typing import List, Annotated
from models import *
from database import engine, SessionLocal
from datetime import datetime


#starts connection to database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

class SQLRepository(Repository):
    def __init__(self, db: db_dependency):
        self.db = db

    def create_item(self, item: ItemBase) -> Item:
        db_item = Item(**item.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return f'Item with id: {db_item.id} created.', db_item

    def get_items(self, skip: int, limit: int) -> List[ItemModel]:
        return self.db.query(Item).offset(skip).limit(limit).all()

    def get_item_by_id(self, item_id: int) -> Item:
        db_item = self.db.query(Item).filter(Item.id == item_id).first()
        if db_item is None:
            raise HTTPException(status_code=404, detail='Item not found')
        return db_item

    def update_item(self, item_id: int, item_update: UpdateItemBase) -> Item:
        db_item = self.db.query(Item).filter(Item.id == item_id).first()
        if db_item is None:
            raise HTTPException(status_code=404, detail='Item not found') 
        for field, value in item_update.dict().items():
            if value is not None:
                setattr(db_item, field, value)
        self.db.commit()
        return f'Item with ID {db_item.id} updated.', db_item

    def delete_item(self, item_id: int):
        db_item = self.db.query(Item).filter(Item.id == item_id).first()
        if db_item is None:
            raise HTTPException(status_code=404, detail='Item not found')
        self.db.delete(db_item)
        self.db.commit()

    def create_transaction(self, transaction: TransactionBase) -> Transaction:
        db_transaction = Transaction(**transaction.dict())
        db_transaction.timestamp = datetime.now()
        self.db.add(db_transaction)
        self.db.commit()
        return f'{db_transaction.direction} of item with ID: {db_transaction.item_id} completed successfully'

    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[TransactionModel]:
        transactions = self.db.query(Transaction).offset(skip).limit(limit).all()
        return transactions

    def read_transaction(self, transaction_id: int):
        transaction = self.db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if transaction is None:
            raise HTTPException(status_code=404, detail='Transaction not found')
        return transaction

    def delete_transaction(self, transaction_id: int):
        db_transaction = self.db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if db_transaction is None:
            raise HTTPException(status_code=404, detail='Transaction not found')
        self.db.delete(db_transaction)
        self.db.commit()
        return f'Deletion of transaction (ID: {db_transaction.id}) of completed successfully.'

