from cgitb import text
from datetime import date
from pydantic import BaseModel
from typing import Union
from .interested import Interested


class ProfileCreateIn(BaseModel):
    username: str
    email: str
    password: str
    first_name: str | None
    last_name: str | None
    location: str | None
    date_of_birth: date | None
    interested: Interested


class ProfileUpdateIn(BaseModel):
    location: str
    photo: Union[str, None]
    about: Union[str, None]
    height: Union[int, None]
    job: Union[str, None]
    education: Union[str, None]
    gender: Union[str, None]
    sexual_orientation: Union[str, None]
    religion: Union[str, None]
    ethnicity: Union[str, None]
    pronouns: Union[str, None]
    interested: Interested


class ProfileUpdateOut(BaseModel):
    id: int
    location: str
    photo: Union[str, None]
    about: Union[str, None]
    height: Union[int, None]
    job: Union[str, None]
    education: Union[str, None]
    gender: Union[str, None]
    sexual_orientation: Union[str, None]
    religion: Union[str, None]
    ethnicity: Union[str, None]
    pronouns: Union[str, None]
    interested: list[str]


class ProfileOutWithInterested(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    location: str
    date_of_birth: date
    photo: Union[str, None]
    about: Union[str, None]
    height: Union[int, None]
    job: Union[str, None]
    education: Union[str, None]
    gender: Union[str, None]
    sexual_orientation: Union[str, None]
    religion: Union[str, None]
    ethnicity: Union[str, None]
    pronouns: Union[str, None]
    interested: list[str]
    average_rating: Union[float, None]


class ProfileOut(BaseModel):
    id: int
    username: str
    email: str
    first_name: str
    last_name: str
    location: str
    date_of_birth: date
    photo: Union[str, None]
    about: Union[str, None]
    height: Union[int, None]
    job: Union[str, None]
    education: Union[str, None]
    gender: Union[str, None]
    sexual_orientation: Union[str, None]
    religion: Union[str, None]
    ethnicity: Union[str, None]
    pronouns: Union[str, None]


class ProfileList(BaseModel):
    page_count: int
    profiles: list[ProfileOut]


class ProfileDeleteOperation(BaseModel):
    result: bool


class PhotoOut(BaseModel):
    current_user: int
    file_url: str