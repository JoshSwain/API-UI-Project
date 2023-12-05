from typing import List
from fastapi import HTTPException
from repositories.repository_interface.inventory import InventoryRepo
from models.inventory import Inventory, InventoryBase, InventoryModel, UpdateInventoryBase
from database import db_dependency

class InventorySQLRepository(InventoryRepo):
    def __init__(self, db: db_dependency):
        self.db = db

    def create_inventory(self, new_inventory: InventoryBase) -> Inventory:
        db_inventory = Inventory(**new_inventory.dict())
        self.db.add(db_inventory)
        self.db.commit()
        self.db.refresh(db_inventory)
        return f'Inventory with id: {db_inventory.item_id} created.', db_inventory

    def get_inventory(self, skip: int, limit: int) -> List[InventoryModel]:
        return self.db.query(Inventory).offset(skip).limit(limit).all()

    def get_inventory_by_id(self, item_id: int) -> Inventory:
        db_inventory = self.db.query(Inventory).filter(Inventory.item_id == item_id).first()
        if db_inventory is None:
            raise HTTPException(status_code=404, detail='Inventory not found')
        return db_inventory

    def update_inventory(self, item_id: int, inventory_update: UpdateInventoryBase) -> Inventory:
        db_inventory = self.db.query(Inventory).filter(Inventory.item_id == item_id).first()
        if db_inventory is None:
            raise HTTPException(status_code=404, detail='Inventory not found')
        elif inventory_update is None:
            return f'Insufficient inventory, current inventory: {db_inventory.quantity}'
        for field, value in inventory_update.dict().items():
            if value is not None:
                setattr(db_inventory, field, value)
        self.db.commit()
        return f'Inventory of item with ID {db_inventory.item_id} updated.', db_inventory

    def delete_inventory(self, item_id: int):
        db_inventory = self.db.query(Inventory).filter(Inventory.item_id == item_id).first()
        if db_inventory is None:
            raise HTTPException(status_code=404, detail='Inventory not found')
        self.db.delete(db_inventory)
        self.db.commit()
