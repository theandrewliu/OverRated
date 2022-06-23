from pydantic import BaseModel


class AccountUpdateIn(BaseModel):
    username: str
    email: str
    password: str
    first_name: str
    last_name: str


class AccountUpdateOut(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
