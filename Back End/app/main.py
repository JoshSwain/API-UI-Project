from fastapi import FastAPI
from routers import router_items, router_transactions, router_inventory
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

app.include_router(router_items.router, tags=["items"])
app.include_router(router_transactions.router, tags=["transactions"])
app.include_router(router_inventory.router, tags=["inventory"])
