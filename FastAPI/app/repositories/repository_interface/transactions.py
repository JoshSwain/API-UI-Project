from abc import ABC, abstractmethod
from typing import List
from models import transactions

class TransactionRepo(ABC):
    @abstractmethod
    def create_transaction(self, transaction: transactions.TransactionBase) -> transactions.Transaction:
        pass

    @abstractmethod
    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[transactions.TransactionModel]:
        pass

    @abstractmethod
    def read_transaction(transaction_id: int) -> transactions.Transaction:
        pass

    @abstractmethod
    def delete_transaction(transaction_id: int):
        pass
