from fastapi import FastAPI, HTTPException, Depends, status
from typing import List
from models import *
from fastapi.middleware.cors import CORSMiddleware
from sql_respository import SQLRepository
from repository_interface import Repository

app = FastAPI()



origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=['*']
)

current_repo = SQLRepository

#Create a new item with the new SQL Wrapper
@app.post("/items/", status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemBase, repository: Repository = Depends(current_repo)):
    item_posted = repository.create_item(item)
    return item_posted

#Get all Items with the new sql wrapper
@app.get("/items/", response_model=List[ItemModel], status_code=status.HTTP_200_OK)
async def get_items(skip: int = 0, limit: int = 100, repository: Repository = Depends(current_repo)):
    items_got = repository.get_items(skip, limit)
    return items_got


#Gets a specifc item by ID
@app.get("/items/{item_id}", status_code=status.HTTP_200_OK)
async def get_item_by_id(item_id: int, repository: Repository = Depends(current_repo)):
    item_got = repository.get_item_by_id(item_id)
    return item_got

#Updates items
@app.put("/items/{item_id}", status_code=status.HTTP_200_OK)
async def update_item(item_id: int, item_update: UpdateItemBase, repository: Repository = Depends(current_repo)):
    item_updated = repository.update_item(item_id, item_update)
    return item_updated

#Deletes Items
@app.delete("/items/{item_id}", status_code=status.HTTP_200_OK)
async def delete_item(item_id: int, repository: Repository = Depends(current_repo)):
    item_deleted = repository.delete_item(item_id)
    return item_deleted

#Create a new transaction, if a transaction is successful it will add/subtract the count (quantity) of the item
@app.post("/transactions/", status_code=status.HTTP_201_CREATED)
async def create_transaction(transaction: TransactionBase, repository: Repository = Depends(current_repo)):
    transaction_created = repository.create_transaction(transaction)
    return transaction_created

#Gets all transactions
@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(skip: int = 0, limit: int = 100, repository: Repository = Depends(current_repo)):
    transactions_read = repository.read_transactions(skip,limit)
    return transactions_read

#Gets a transaction by specific ID
@app.get("/transactions/{transaction_id}", status_code=status.HTTP_200_OK)
async def read_transaction(transaction_id: int, repository: Repository = Depends(current_repo)):
    transaction_read = repository.read_transaction(transaction_id)
    return transaction_read

#Deletes a transaction, please note that this does not revert the count on an item. Possibly could implement in the future.
@app.delete("/transactions/{transaction_id}", status_code=status.HTTP_200_OK)
async def delete_transaction(transaction_id: int, repository: Repository = Depends(current_repo)):
    transaction_deleted = repository.delete_transaction(transaction_id)
    return transaction_deleted
