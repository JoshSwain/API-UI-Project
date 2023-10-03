import requests
# print(requests.get("http://localhost:8000/").json())

#print(requests.get("http://localhost:8000/items?name=Grinder").json())


# print(
#     requests.post(
#         "http://127.0.0.1:8000/",
#         json={"name": "Ice Cream Sandwich", "price": 3.99, "count": 10, "id": 4, "category": "sandwiches"},
#     ).json()
# )

print(
    requests.put(
        "http://127.0.0.1:8000/update/2?category=beverages",
        
    ).json()
)


# print(requests.get("http://localhost:8000/items/4").json()
#       )

# print(requests.delete("http://127.0.0.1:8000/delete/5").json())

# print(requests.get("http://localhost:8000/items/4").json()
#       )


