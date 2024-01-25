#test_items_routers.py
import pytest
import requests
from app.config import FASTAPI_URL
from .test_tools.crud_tester import get_tester, post_tester, put_tester, delete_tester

obj_path = "/items/"
item_url = f"{FASTAPI_URL}{obj_path}"
inventory_url = f"{FASTAPI_URL}/inventory/"

test_item = {
    "name": "TestPostBody1141",
    "price": 10.0,
    "category": "sandwiches"
}

test_item_update = {
  "name": None,
  "price": 12.0,
  "category": None
}
#Creates an item, updates the item, then deletes the item, validating along the way.
def test_item_cycle():

    #Create test item
    test_post_item = post_tester(item_url, test_item)

    #Tests that created item details match the request we sent
    body = test_post_item.json()[1]
    assert body["name"] == test_item["name"]
    assert body["category"] == test_item["category"]
    assert body["price"] == test_item["price"]

    id = body["id"]

    #Verifying item was added to database
    get_tester(f"{item_url}{id}")

    #Verifies all items can be fetched
    get_tester(f"{item_url}")

    #Verifying inventory can be fetched
    get_tester(f"{inventory_url}{id}")

    #Update the object and verify the change in price
    test_update_obj = put_tester(f"{item_url}{id}", test_item_update)
    assert test_update_obj.json()[1]["price"] == 12.0

    #Delete item
    delete_tester(f"{item_url}{id}")


