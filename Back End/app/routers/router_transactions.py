from typing import List
from fastapi import APIRouter, Depends, status
from repo_selector import current_transaction_repo, current_inventory_repo
from repositories.repository_interface.repo_transactions import TransactionRepo
from repositories.repository_interface.repo_inventory import InventoryRepo
from models.models_transactions import TransactionBase, TransactionModel
from business_logic.transaction_logic import transaction_logic_func

router = APIRouter(
    prefix="/transactions"
)

#Create a new transaction, if a transaction is successful it will add/subtract the count (quantity) of the item
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: TransactionBase, repository: TransactionRepo = Depends(current_transaction_repo), invRepo: InventoryRepo = Depends(current_inventory_repo) ):
    current_inventory = invRepo.get_inventory_by_id(transaction.item_id)
    inv_update = transaction_logic_func(transaction=transaction, quantity=current_inventory.quantity)
    if inv_update == 'Insufficient Inventory':
        return print(f'Insufficient inventory, current inventory: {current_inventory.quantity}')
    invRepo.update_inventory(transaction.item_id, inv_update)
    transaction_created = repository.create_transaction(transaction)
    return transaction_created

#Gets all transactions
@router.get("/", response_model=List[TransactionModel])
async def read_transactions(skip: int = 0, limit: int = 100, repository: TransactionRepo = Depends(current_transaction_repo)):
    transactions_read = repository.read_transactions(skip,limit)
    return transactions_read

#Gets a transaction by specific ID
@router.get("/{transaction_id}", status_code=status.HTTP_200_OK)
async def read_transaction(transaction_id: int, repository: TransactionRepo = Depends(current_transaction_repo)):
    transaction_read = repository.read_transaction(transaction_id)
    return transaction_read

#Deletes a transaction, please note that this does not revert the count on an item. Possibly could implement in the future.
@router.delete("/{transaction_id}", status_code=status.HTTP_200_OK)
async def delete_transaction(transaction_id: int, repository: TransactionRepo = Depends(current_transaction_repo)):
    transaction_deleted = repository.delete_transaction(transaction_id)
    return transaction_deleted
