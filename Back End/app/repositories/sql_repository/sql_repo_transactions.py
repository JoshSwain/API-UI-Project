from typing import List
from datetime import datetime
from repositories.repository_interface.repo_transactions import TransactionRepo
from database import db_dependency
from models.models_transactions import Transaction, TransactionBase, TransactionModel
from fastapi import HTTPException

class TransactionSQLRepository(TransactionRepo):
    def __init__(self, db: db_dependency):
        self.db = db

    def create_transaction(self, transaction: TransactionBase) -> Transaction:
        db_transaction = Transaction(**transaction.dict())
        db_transaction.timestamp = datetime.now()
        self.db.add(db_transaction)
        self.db.commit()
        return f'{db_transaction.direction} of item with ID: {db_transaction.item_id} completed successfully', db_transaction

    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[TransactionModel]:
        db_transactions = self.db.query(Transaction).offset(skip).limit(limit).all()
        return db_transactions

    def read_transaction(self, transaction_id: int):
        db_transaction = self.db.query(Transaction).filter(Transaction.id == transaction_id).first()
        if db_transaction is None:
            raise HTTPException(status_code=404, detail='Transaction not found')
        return db_transaction

    def delete_transaction(self, transaction_id: int):
        db_transaction = self.read_transaction(transaction_id)
        self.db.delete(db_transaction)
        self.db.commit()
        return f'Deletion of transaction (ID: {db_transaction.id}) of completed successfully.'

