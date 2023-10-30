from abc import ABC, abstractmethod
from typing import List
from models import inventory

class InventoryRepo(ABC):
    @abstractmethod
    def create_inventory(self, inventory: inventory.InventoryBase) -> inventory.Inventory:
        pass

    @abstractmethod
    def get_inventory(self, skip: int, limit: int) -> List[inventory.InventoryModel]:
        pass

    @abstractmethod
    def get_inventory_by_id(self, item_id: int) -> inventory.Inventory:
        pass

    @abstractmethod
    def update_inventory(self, item_id: int, inventory_update: inventory.UpdateInventoryBase) -> inventory.Inventory:
        pass

    @abstractmethod
    def delete_inventory(self, item_id: int):
        pass
