from datetime import date
from pydantic import BaseModel
from typing import Optional




class ProfileIn(BaseModel):
    username: str
    password: str


class ProfileOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    location: str
    date_of_birth: date
    photo: Optional[str]
    about: str
    height: int
    job: str
    education: str
    gender: str
    sexual_orientation: str
    religion: str
    ethnicity: str
    pronouns: str

class ProfileList(BaseModel):
    page_count: int
    profiles: list[ProfileOut]


class ProfileDeleteOperation(BaseModel):
    result: bool
