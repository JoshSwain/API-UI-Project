from abc import ABC, abstractmethod
from typing import List
from models.models_inventory import Inventory, InventoryBase, InventoryModel, UpdateInventoryBase

#Abstract Class that restricts any new DB Repo to the CRUD functions below
class InventoryRepo(ABC):
    @abstractmethod
    def create_inventory(self, inventory: InventoryBase) -> Inventory:
        pass

    @abstractmethod
    def get_inventory(self, skip: int, limit: int) -> List[InventoryModel]:
        pass

    @abstractmethod
    def get_inventory_by_id(self, item_id: int) -> Inventory:
        pass

    @abstractmethod
    def update_inventory(self, item_id: int, inventory_update: UpdateInventoryBase) -> Inventory:
        pass

    @abstractmethod
    def delete_inventory(self, item_id: int):
        pass
