from abc import ABC, abstractmethod
from typing import List
from models import *

class Repository(ABC):
    @abstractmethod
    def create_item(self, item: ItemBase) -> Item:
        pass

    @abstractmethod
    def get_items(self, skip: int, limit: int) -> List[ItemModel]:
        pass

    @abstractmethod
    def get_item_by_id(self, item_id: int) -> Item:
        pass

    @abstractmethod
    def update_item(self, item_id: int, item_update: UpdateItemBase) -> Item:
        pass

    @abstractmethod
    def delete_item(self, item_id: int):
        pass

    @abstractmethod
    def create_transaction(self, transaction: TransactionBase) -> Transaction:
        pass

    @abstractmethod
    def read_transactions(self, skip: int = 0, limit: int = 100) -> List[TransactionModel]:
        pass

    @abstractmethod
    def read_transaction(transaction_id: int) -> Transaction:
        pass

    @abstractmethod
    def delete_transaction(transaction_id: int):
        pass
