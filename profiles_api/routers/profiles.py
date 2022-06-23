from fastapi import APIRouter, Depends, Response, status
from typing import Union

from models.profiles import (
    ProfileList,
    ProfileDeleteOperation,
    ProfileCreateIn,
    ProfileUpdateIn,
    ProfileUpdateOut,
    ProfileOutWithInterested,
)
from models.common import ErrorMessage
from db.profiles import ProfileQueries, DuplicateUsername
from routers.accounts import pwd_context, User, get_current_user


router = APIRouter()


def row_to_profile_list(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "first_name": row[3],
        "last_name": row[4],
        "date_of_birth": row[6],
        "location": row[5],
        "photo": row[7],
        "about": row[8],
        "height": row[9],
        "job": row[10],
        "education": row[11],
        "gender": row[12],
        "sexual_orientation": row[13],
        "religion": row[14],
        "ethnicity": row[15],
        "pronouns": row[16],
    }
    return profile


def row_to_profile(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "first_name": row[3],
        "last_name": row[4],
        "date_of_birth": row[6],
        "location": row[5],
        "photo": row[7],
        "about": row[8],
        "height": row[9],
        "job": row[10],
        "education": row[11],
        "gender": row[12],
        "sexual_orientation": row[13],
        "religion": row[14],
        "ethnicity": row[15],
        "pronouns": row[16],
        "interested": row[17],
        "average_rating": row[18],
    }
    return profile


def row_to_profile_post(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "password": row[3],
        "first_name": row[4],
        "last_name": row[5],
        "date_of_birth": row[7],
        "location": row[6],
        "interested": row[8],
    }
    return profile


def row_to_profile_update(row):
    profile = {
        "id": row[0],
        "location": row[5],
        "photo": row[7],
        "about": row[8],
        "height": row[9],
        "job": row[10],
        "education": row[11],
        "gender": row[12],
        "sexual_orientation": row[13],
        "religion": row[14],
        "ethnicity": row[15],
        "pronouns": row[16],
        "interested": row[17],
    }
    return profile


# ---- List of all profiles ---- #
@router.get(
    "/api/profiles",
    response_model=ProfileList,
)
async def get_profiles(
    page: int = 0,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user),
):
    page_count, rows = query.get_all_profiles(current_user["id"], page)
    return {
        "page_count": page_count,
        "profiles": [row_to_profile_list(row) for row in rows],
    }


# ---- Gets current user's profile details ---- #
@router.get(
    "/api/profiles/mine",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses={200: {"model": ProfileOutWithInterested}, 404: {"model": ErrorMessage}},
)
def get_my_profile(
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user),
):
    print("current user", current_user)
    row = query.get_profile(current_user["id"])
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return row_to_profile(row)


# ---- Detail view of a specific profile ---- #
@router.get(
    "/api/profiles/{profile_id}",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses={200: {"model": ProfileOutWithInterested}, 404: {"model": ErrorMessage}},
)
def get_profile(profile_id: int, response: Response, query=Depends(ProfileQueries)):
    row = query.get_profile(profile_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return row_to_profile(row)


# ---- Get a random filtered profile ---- #
@router.get(
    "/api/random",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses={200: {"model": ProfileOutWithInterested}, 404: {"model": ErrorMessage}},
)
def get_random_profile(
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user),
):
    row = query.get_random_profile(current_user["id"])
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return row_to_profile(row)


# ---- Create a profile ---- #
@router.post(
    "/api/profiles/profiles",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses={200: {"model": ProfileOutWithInterested}, 409: {"model": ErrorMessage}},
)
def create_profile(
    profile: ProfileCreateIn, response: Response, query=Depends(ProfileQueries)
):
    try:
        hashed_password = pwd_context.hash(profile.password)
        row = query.insert_profile(
            profile.username,
            profile.email,
            hashed_password,
            profile.first_name,
            profile.last_name,
            profile.location,
            profile.date_of_birth,
            profile.interested,
        )
        return row_to_profile_post(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": f"{profile.username} username already exists"}


# ---- Update a profile ---- #
@router.put(
    "/api/profiles/myself",
    response_model=Union[ProfileUpdateOut, ErrorMessage],
    responses={
        200: {"model": ProfileUpdateOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
async def update_profile(
    profile: ProfileUpdateIn,
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user),
):
    print(profile)
    try:
        row = query.update_profile(
            current_user["id"],
            profile.location,
            profile.photo,
            profile.about,
            profile.height,
            profile.job,
            profile.education,
            profile.gender,
            profile.sexual_orientation,
            profile.religion,
            profile.ethnicity,
            profile.pronouns,
            profile.interested,
        )

        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Profile not found"}
        return row_to_profile_update(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Duplicate profile name"}


# ---- Delete current user's profile ---- #
@router.delete(
    "/api/profiles/myself",
    response_model=ProfileDeleteOperation,
)
def delete_profile(
    current_user: User = Depends(get_current_user), query=Depends(ProfileQueries)
):
    try:
        query.delete_profile(current_user["id"])
        return {"result": True}
    except Exception:
        return {"result": False}
