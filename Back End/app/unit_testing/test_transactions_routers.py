import pytest
import requests
from app.config import FASTAPI_URL
from .test_items_routers import test_item
from .test_tools.crud_tester import get_tester, post_tester, delete_tester


obj_path = "/transactions/"
transaction_url = f"{FASTAPI_URL}{obj_path}"

item_url = f"{FASTAPI_URL}/items/"

inventory_url = f"{FASTAPI_URL}/inventory/"

#Unit Test for Transactions/Inventory, creates an item, creates a restocking transaction on it, tests the effects, and then deletes the item.

def test_transaction_cycle():

    #Create item and verify creation
    test_post_item = post_tester(item_url, test_item)
    print(test_post_item.json)

    #Take item id and create a transaction on it
    body = test_post_item.json()[1]
    item_id = body["id"]

    #Sample transaction to be created
    test_transaction = {
    "count": 100,
    "direction": "Restock",
    "item_id": item_id
    }

    test_post_transaction = post_tester(transaction_url, test_transaction)
    transaction_body = test_post_transaction.json()[1]
    transaction_id = transaction_body["id"]

    #Test to assert that the details that are saved match the details that are sent
    assert transaction_body["count"] == test_transaction["count"]
    assert transaction_body["item_id"] == test_transaction["item_id"]
    assert transaction_body["direction"] == test_transaction["direction"]

    #Verifying transaction can be fetched
    get_tester(f"{transaction_url}{transaction_id}")

    #Verifying all transactions can be fetched
    get_tester(f"{transaction_url}")

    #Deleting object and verifying deletion
    test_delete_obj = delete_tester(f"{item_url}{item_id}")
    print(test_delete_obj.json())
    assert test_delete_obj.status_code == 200


