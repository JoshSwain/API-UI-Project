from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import items, transactions, inventory

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

app.include_router(items.router)
app.include_router(transactions.router)
app.include_router(inventory.router)