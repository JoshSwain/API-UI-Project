import pytest
import requests
from app.config import FASTAPI_URL
from .test_items_routers import test_item

obj_path = "/transactions/"
url = f"{FASTAPI_URL}{obj_path}"

item_url = f"{FASTAPI_URL}/items/"

inventory_url = f"{FASTAPI_URL}/inventory/"

def get_tester(url):
    test_obj = requests.get(url)
    print(url, test_obj.status_code)
    assert test_obj.status_code == 200

#Unit Test for Transactions/Inventory, creates an item, creates a restocking transaction on it, tests the effects, and then deletes the item.
@pytest.fixture
def test_post_item():
    return requests.post(item_url, json=test_item)

def test_post(test_post_item):
    print(test_post_item.json)
    assert test_post_item.status_code == 201
    body = test_post_item.json()[1]
    item_id = body["id"]

    test_transaction = {
    "count": 100,
    "direction": "Restock",
    "item_id": item_id
    }

    test_post_transaction = requests.post(url, json=test_transaction)
    transaction_body = test_post_transaction.json()[1]
    transaction_id = transaction_body["id"]
    assert transaction_body["count"] == test_transaction["count"]
    assert transaction_body["item_id"] == test_transaction["item_id"]
    assert transaction_body["direction"] == test_transaction["direction"]



    get_tester(f"{url}{transaction_id}")

    get_tester(f"{url}")

    get_tester(f"{inventory_url}{item_id}")

    test_delete_obj = requests.delete(f"{item_url}{item_id}")
    print(test_delete_obj.json())
    assert test_delete_obj.status_code == 200


