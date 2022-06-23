from pydantic import BaseModel
from typing import List


class Interested(BaseModel):
    interested: List[str]  # list of individual preferences


class InterestedOut(BaseModel):
    id: int
    interested: List[str]
