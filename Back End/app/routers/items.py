from typing import List
from fastapi import APIRouter, Depends, status
from dependencies import current_item_repo
from repositories.repository_interface.items import ItemRepo
from models import items

router = APIRouter(
    prefix="/items"
)

#Create a new item with the new SQL Wrapper
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_item(item: items.ItemBase, repository: ItemRepo = Depends(current_item_repo)):
    item_posted = repository.create_item(item)
    return item_posted

#Get all Items with the new sql wrapper
@router.get("/", response_model=List[items.ItemModel], status_code=status.HTTP_200_OK)
async def get_items(skip: int = 0, limit: int = 100, repository: ItemRepo = Depends(current_item_repo)):
    items_got = repository.get_items(skip, limit)
    return items_got


#Gets a specifc item by ID
@router.get("/{item_id}", status_code=status.HTTP_200_OK)
async def get_item_by_id(item_id: int, repository: ItemRepo = Depends(current_item_repo)):
    item_got = repository.get_item_by_id(item_id)
    return item_got

#Updates items
@router.put("/{item_id}", status_code=status.HTTP_200_OK)
async def update_item(item_id: int, item_update: items.UpdateItemBase, repository: ItemRepo = Depends(current_item_repo)):
    item_updated = repository.update_item(item_id, item_update)
    return item_updated

#Deletes Items
@router.delete("/{item_id}", status_code=status.HTTP_200_OK)
async def delete_item(item_id: int, repository: ItemRepo = Depends(current_item_repo)):
    item_deleted = repository.delete_item(item_id)
    return item_deleted