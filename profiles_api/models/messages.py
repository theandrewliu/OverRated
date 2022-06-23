from datetime import datetime
from sqlite3 import Timestamp
from pydantic import BaseModel
from typing import Union


class MessageOut(BaseModel):
    id: int
    match_id: int
    sender: int
    recipient: int
    sent: datetime
    message: str


class MessageListOut(BaseModel):
    id: int
    photo: Union[str, None]
    first_name: str
    last_name: str
    match_id: int
    sender: int
    recipient: int
    sent: datetime
    message: str


class MessageList(BaseModel):
    messages: list[MessageListOut]


class MessageIn(BaseModel):
    recipient: int
    sent: datetime
    message: str


class MessageDetailOut(BaseModel):
    id: int
    sender: int
    recipient: int
    sent: datetime
    message: str


class MessageDetailListOut(BaseModel):
    messages: list[MessageDetailOut]