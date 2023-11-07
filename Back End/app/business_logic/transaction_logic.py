from fastapi import Depends
from models import transactions, inventory
from repositories.repository_interface.inventory import InventoryRepo
from dependencies import current_inventory_repo


#Subtracts/Adds Count from transaction to an item's inventory quantity

def transaction_logic_func(transaction: transactions.TransactionBase, quantity: int, repository: InventoryRepo = Depends(current_inventory_repo)):
    new_quantity = None
    if transaction.direction == 'Sale':
        new_quantity = quantity - transaction.count
        if new_quantity < 0:
            return 'Insufficient Inventory'
    elif transaction.direction == 'Restock':
        new_quantity = quantity + transaction.count
    if new_quantity is not None:
        inventory_update = inventory.UpdateInventoryBase(quantity=new_quantity)
        return inventory_update

