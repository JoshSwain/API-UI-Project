import requests
# print(requests.get("http://localhost:8000/").json())

print(
    requests.post(
        "http://127.0.0.1:8000/",
        json={"name": "Ice Cream Sandwich", "price": 3.99, "count": 10, "id": 4, "category": "sandwiches"},
    ).json()
)


print(requests.get("http://localhost:8000/items/4").json()
      )




