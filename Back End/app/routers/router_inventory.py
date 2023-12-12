from typing import List
from fastapi import APIRouter, Depends, status
from repo_selector import current_inventory_repo
from repositories.repository_interface.repo_inventory import InventoryRepo
from models.models_inventory import InventoryBase, InventoryModel, UpdateInventoryBase

router = APIRouter(
    prefix="/inventory"
)

#Create a new inventory with the new SQL Wrapper
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_inventory(inventory: InventoryBase, repository: InventoryRepo = Depends(current_inventory_repo)):
    inventory_posted = repository.create_inventory(inventory)
    return inventory_posted

#Get all Inventorys with the new sql wrapper
@router.get("/", response_model=List[InventoryModel], status_code=status.HTTP_200_OK)
async def get_inventory(skip: int = 0, limit: int = 100, repository: InventoryRepo = Depends(current_inventory_repo)):
    inventory_got = repository.get_inventory(skip, limit)
    return inventory_got


#Gets a specifc inventory by ID
@router.get("/{item_id}", status_code=status.HTTP_200_OK)
async def get_inventory_by_id(item_id: int, repository: InventoryRepo = Depends(current_inventory_repo)):
    inventory_got = repository.get_inventory_by_id(item_id)
    return inventory_got

#Updates inventory
@router.put("/{item_id}", status_code=status.HTTP_200_OK)
async def update_inventory(item_id: int, inventory_update: UpdateInventoryBase, repository: InventoryRepo = Depends(current_inventory_repo)):
    inventory_updated = repository.update_inventory(item_id, inventory_update)
    return inventory_updated

#Deletes Inventorys
@router.delete("/{item_id}", status_code=status.HTTP_200_OK)
async def delete_inventory(item_id: int, repository: InventoryRepo = Depends(current_inventory_repo)):
    inventory_deleted = repository.delete_inventory(item_id)
    return inventory_deleted