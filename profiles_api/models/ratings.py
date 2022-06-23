from pydantic import BaseModel


class RatingIn(BaseModel):
    rating: int
    rating_of: int


class RatingOut(BaseModel):
    id: int
    rating: int
    rating_of: int
    rating_by: int


class RatingAvgOut(BaseModel):
    average_rating: float


class RatingsList(BaseModel):
    ratings: list[RatingOut]