from fastapi import FastAPI
from routers import items, transactions, inventory
from middleware_selector import current_middleware
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    current_middleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(items.router)
app.include_router(transactions.router)
app.include_router(inventory.router)
