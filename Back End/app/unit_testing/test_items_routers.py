import pytest
import requests
from app.config import FASTAPI_URL

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

#Unit Test For Item, creates an item, then cycles through CRUD operations before deleting
@pytest.fixture
def test_post_item():
    return requests.post(item_url, json=test_item)

def test_post(test_post_item):
    assert test_post_item.status_code == 201

    body = test_post_item.json()[1]
    assert body["name"] == test_item["name"]
    assert body["category"] == test_item["category"]
    assert body["price"] == test_item["price"]

    id = body["id"]

    def get_tester(url):
        test_obj = requests.get(url)
        print(url, test_obj.status_code)
        assert test_obj.status_code == 200

    get_tester(f"{item_url}{id}")

    get_tester(f"{item_url}")

    get_tester(f"{inventory_url}{id}")

    test_update_obj = requests.put(f"{item_url}{id}", json=test_item_update)
    assert test_update_obj.status_code == 200
    assert test_update_obj.json()[1]["price"] == 12.0

    test_delete_obj = requests.delete(f"{item_url}{id}")
    assert test_delete_obj.status_code == 200


