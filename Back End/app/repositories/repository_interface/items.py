from abc import ABC, abstractmethod
from typing import List
from models import items

#Abstract Class that restricts any new DB Repo to the CRUD functions below
class ItemRepo(ABC):
    @abstractmethod
    def create_item(self, item: items.ItemBase) -> items.Item:
        pass

    @abstractmethod
    def get_items(self, skip: int, limit: int) -> List[items.ItemModel]:
        pass

    @abstractmethod
    def get_item_by_id(self, item_id: int) -> items.Item:
        pass

    @abstractmethod
    def update_item(self, item_id: int, item_update: items.UpdateItemBase) -> items.Item:
        pass

    @abstractmethod
    def delete_item(self, item_id: int):
        pass
