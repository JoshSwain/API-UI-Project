from fastapi import APIRouter, Depends, status
from dependencies import current_transaction_repo
from repositories.repository_interface.transactions import TransactionRepo
from models import transactions
from typing import List


router = APIRouter(
    prefix="/transactions"
)

#Create a new transaction, if a transaction is successful it will add/subtract the count (quantity) of the item
@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: transactions.TransactionBase, repository: TransactionRepo = Depends(current_transaction_repo)):
    transaction_created = repository.create_transaction(transaction)
    return transaction_created

#Gets all transactions
@router.get("/", response_model=List[transactions.TransactionModel])
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
