from fastapi import APIRouter, Depends, Response, status
from typing import Union

from models.matches import (
    SwipedIn,
    SwipedOut,
    MatchedList,
)
from models.common import ErrorMessage
from db.matches import MatchQueries, DuplicateTarget
from routers.accounts import User, get_current_user


router = APIRouter()


def row_to_profile_swiped(row):
    profile = {
        "id": row[0],
        "active_user_id": row[1],
        "target_user_id": row[2],
        "liked": row[3],
    }
    return profile


def row_to_matched_list(row):
    match = {
        "id": row[0],
        "photo": row[1],
        "first_name": row[2],
        "last_name": row[3],
        "location": row[4],
        "date_of_birth": row[5],
        "average_rating": row[6],
        "match_id": row[7],
    }
    return match


# ---- Like a user's profile ---- #
@router.post(
    "/api/profiles/{target_user_id}/liked",
    response_model=Union[SwipedOut, ErrorMessage],
    responses={200: {"model": SwipedOut}, 409: {"model": ErrorMessage}},
)
def liked(
    profile: SwipedIn,
    target_user_id: int,
    response: Response,
    query=Depends(MatchQueries),
    current_user: User = Depends(get_current_user),
):
    try:
        row = query.like_profile(
            current_user["id"],
            target_user_id,
        )
        return row_to_profile_swiped(row)
    except DuplicateTarget:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": f"Target User {target_user_id} was already swiped"}


# ---- Dislike a user's profile ---- #
@router.post(
    "/api/profiles/{target_user_id}/disliked",
    response_model=Union[SwipedOut, ErrorMessage],
    responses={200: {"model": SwipedOut}, 409: {"model": ErrorMessage}},
)
def disliked(
    profile: SwipedIn,
    target_user_id: int,
    response: Response,
    query=Depends(MatchQueries),
    current_user: User = Depends(get_current_user),
):
    try:
        row = query.dislike_profile(
            current_user["id"],
            target_user_id,
        )
        return row_to_profile_swiped(row)
    except DuplicateTarget:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": f"Target User {target_user_id} was already swiped"}


# ---- List of matches ---- #
@router.get(
    "/api/my-matches",
    response_model=MatchedList,
)
async def get_matches(
    page: int = 0,
    query=Depends(MatchQueries),
    current_user: User = Depends(get_current_user),
):
    page_count, rows = query.list_matches(current_user["id"], page)
    return {
        "page_count": page_count,
        "matches": [row_to_matched_list(row) for row in rows],
    }
