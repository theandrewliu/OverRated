from datetime import date
from pydantic import BaseModel
from typing import Union


class SwipedOut(BaseModel):
    id: int
    active_user_id: int
    target_user_id: int
    liked: bool


class SwipedIn(BaseModel):
    target_user_id: int


class MatchedProfile(BaseModel):
    id: int
    photo: Union[str, None]
    first_name: str
    last_name: str
    location: str
    date_of_birth: date
    average_rating: Union[float, None]
    match_id: int


class MatchedList(BaseModel):
    page_count: int
    matches: list[MatchedProfile]