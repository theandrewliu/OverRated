from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.ratings import RatingAvgOut, RatingIn, RatingOut, RatingsList
from models.common import ErrorMessage
from db.ratings import RatingQueries, DuplicateTarget
from routers.accounts import User, get_current_user


router = APIRouter()


def row_to_rating(row):
    rating = {"id": row[0], "rating": row[1], "rating_of": row[2], "rating_by": row[3]}
    return rating


def row_to_ratings_list(row):
    rating = {
        "id": row[0],
        "rating": row[1],
        "rating_of": row[2],
        "rating_by": row[3],
    }
    return rating


# ---- Rate a user ---- #
@router.post(
    "/api/profiles/{target_user_id}/rating",
    response_model=Union[RatingOut, ErrorMessage],
    responses={200: {"model": RatingOut}, 409: {"model": ErrorMessage}},
)
def create_rating(
    profile: RatingIn,
    target_user_id: int,
    response: Response,
    query=Depends(RatingQueries),
    current_user: User = Depends(get_current_user),
):
    try:
        row = query.create_rating(
            profile.rating,
            target_user_id,
            current_user["id"],
        )
        return row_to_rating(row)
    except DuplicateTarget:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Target user does not exist"}


# ---- Get the rating average of a user ---- #
@router.get(
    "/api/profiles/{target_user_id}/average-rating",
    response_model=Union[RatingAvgOut, ErrorMessage],
    responses={200: {"model": RatingAvgOut}, 409: {"model": ErrorMessage}},
)
def get_rating_avg(
    target_user_id: int, response: Response, query=Depends(RatingQueries)
):
    row = query.get_average_rating(target_user_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return {"average_rating": row}


# ---- Get a list of all the ratings of a user ---- #
@router.get(
    "/api/my-ratings",
    response_model=RatingsList,
    responses={200: {"model": RatingsList}, 404: {"model": ErrorMessage}},
)
async def get_ratings(
    response: Response,
    query=Depends(RatingQueries),
    current_user: User = Depends(get_current_user),
):
    rows = query.list_ratings(current_user["id"])
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return {
        "ratings": [row_to_ratings_list(row) for row in rows],
    }
