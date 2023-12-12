from typing import List
from fastapi import HTTPException
from repositories.repository_interface.repo_items import ItemRepo
from models.models_items import Item, ItemBase, ItemModel, UpdateItemBase
from database import db_dependency

class ItemSQLRepository(ItemRepo):
    def __init__(self, db: db_dependency):
        self.db = db

    def get_item_by_id(self, item_id: int) -> Item:
        db_item = self.db.query(Item).filter(Item.id == item_id).first()
        if db_item is None:
            raise HTTPException(status_code=404, detail='Item not found')
        return db_item

    def get_items(self, skip: int, limit: int) -> List[ItemModel]:
        return self.db.query(Item).offset(skip).limit(limit).all()

    def create_item(self, item: ItemBase) -> Item:
        if self.db.query(Item).filter(Item.name == item.name).first():
            raise HTTPException(status_code=400, detail="Item with the same name already exists")
        db_item = Item(**item.dict())
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return f'Item with id: {db_item.id} created.', db_item

    def update_item(self, item_id: int, item_update: UpdateItemBase) -> Item:
        db_item = self.get_item_by_id(item_id)
        for field, value in item_update.dict().items():
            if value is not None:
                setattr(db_item, field, value)
        self.db.commit()
        return f'Item with ID {db_item.id} updated.', db_item

    def delete_item(self, item_id: int):
        db_item = self.get_item_by_id(item_id)
        self.db.delete(db_item)
        self.db.commit()
