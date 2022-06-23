from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from upload import upload
import os

from routers import profiles, accounts, chat, messages

app = FastAPI()

# Using routers for organization
# See https://fastapi.tiangolo.com/tutorial/bigger-applications/

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(profiles.router)
app.include_router(accounts.router)
app.include_router(chat.router)
app.include_router(messages.router)
app.include_router(upload.router)
