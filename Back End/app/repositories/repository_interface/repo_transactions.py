from abc import ABC, abstractmethod
from typing import List
from models.models_transactions import Transaction, TransactionBase, TransactionModel

#Abstract Class that restricts any new DB Repo to the CRUD functions below
class TransactionRepo(ABC):
    @abstractmethod
    def create_transaction(self, transaction: TransactionBase) -> Transaction:
        pass

    @abstractmethod
    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[TransactionModel]:
        pass

    @abstractmethod
    def read_transaction(self, transaction_id: int) -> Transaction:
        pass

    @abstractmethod
    def delete_transaction(self, transaction_id: int):
        pass
