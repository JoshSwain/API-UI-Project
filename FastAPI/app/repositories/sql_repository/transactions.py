from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from repositories.repository_interface.transactions import TransactionRepo
from typing import List
from database import db_dependency
from models import transactions
from datetime import datetime

class TransactionSQLRepository(TransactionRepo):
    def __init__(self, db: db_dependency):
        self.db = db
    def create_transaction(self, transaction: transactions.TransactionBase) -> transactions.Transaction:
        db_transaction = transactions.Transaction(**transaction.dict())
        db_transaction.timestamp = datetime.now()
        self.db.add(db_transaction)
        self.db.commit()
        return f'{db_transaction.direction} of item with ID: {db_transaction.item_id} completed successfully'

    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[transactions.TransactionModel]:
        db_transactions = self.db.query(transactions.Transaction).offset(skip).limit(limit).all()
        return db_transactions

    def read_transaction(self, transaction_id: int):
        db_transaction = self.db.query(transactions.Transaction).filter(transactions.Transaction.id == transaction_id).first()
        if db_transaction is None:
            raise HTTPException(status_code=404, detail='Transaction not found')
        return db_transaction

    def delete_transaction(self, transaction_id: int):
        db_transaction = self.db.query(transactions.Transaction).filter(transactions.Transaction.id == transaction_id).first()
        if db_transaction is None:
            raise HTTPException(status_code=404, detail='Transaction not found')
        self.db.delete(db_transaction)
        self.db.commit()
        return f'Deletion of transaction (ID: {db_transaction.id}) of completed successfully.'

