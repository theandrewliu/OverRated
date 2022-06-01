from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.profiles import (
    ProfileList,
    ProfileDeleteOperation,
    ProfileOut,
    ProfileCreateIn,
    ProfileUpdateIn,
    AccountUpdateIn
)
from models.common import ErrorMessage
from db import ProfileQueries, DuplicateUsername

router = APIRouter()


def row_to_profile(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "first_name":row[2],
        "last_name":row[3],
        "date_of_birth":row[5],
        "location":row[4],
        "photo":row[6],
        "about":row[7],
        "height":row[8],
        "job":row[9],
        "education":row[10],
        "gender":row[11],
        "sexual_orientation":row[12],
        "religion":row[13],
        "ethnicity":row[14],
        "pronouns":row[15],
    }
    return profile


def row_to_profile_post(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "password": row[2],
        "first_name":row[3],
        "last_name":row[4],
        "date_of_birth":row[6],
        "location":row[5],
    }
    return profile

def row_to_profile_update(row):
    profile = {
        "id": row[0],
        "location":row[1],
        "photo":row[2],
        "about":row[3],
        "height":row[4],
        "job":row[5],
        "education":row[6],
        "gender":row[7],
        "sexual_orientation":row[8],
        "religion":row[9],
        "ethnicity":row[10],
        "pronouns":row[11],
    }
    return profile

def row_to_account_update(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "password": row[2],
        "first_name":row[3],
        "last_name":row[4],
    }
    return profile

@router.get(
    "/api/profiles",
    response_model=ProfileList,
)
def get_profiles(page: int=0, query=Depends(ProfileQueries)):
    page_count, rows = query.get_all_profiles(page)
    return {
        "page_count": page_count,
        "profiles": [row_to_profile(row) for row in rows],
    }


@router.get(
    "/api/profiles/{profile_id}",
    response_model=Union[ProfileOut, ErrorMessage],
    responses = {
        200: {"model": ProfileOut},
        404: {"model": ErrorMessage}
    }
)
def get_profile(profile_id: int, response: Response, query=Depends(ProfileQueries)):
    row = query.get_profile(profile_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return row_to_profile(row)


@router.post(
    "/api/profiles/profiles",
    response_model=Union[ProfileOut, ErrorMessage],
    responses={
        200: {"model": ProfileOut},
        409: {"model": ErrorMessage}
    },
)
def create_profile(
    profile: ProfileCreateIn,
    response: Response,
    query=Depends(ProfileQueries)
):
    try:
        row = query.insert_profile(
            profile.username, 
            profile.password, 
            profile.first_name, 
            profile.last_name, 
            profile.location, 
            profile.date_of_birth
        )
        return row_to_profile_post(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": f"{profile.username} username already exists"}

# update personal info
@router.put(
    "/api/profiles/{profile_id}",
    # response_model=Union[ProfileOut, ErrorMessage],
    responses={
        200: {"model": ProfileOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
def update_profile(
    profile_id: int,
    profile: ProfileUpdateIn,
    response: Response,
    query=Depends(ProfileQueries),
):
    try:
        row = query.update_profile(
            profile_id,
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
            profile.pronouns
        )
        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Profile not found"}
        return row_to_profile_update(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Duplicate profile name"}

@router.delete(
    "/api/profiles/{profile_id}",
    response_model=ProfileDeleteOperation,
)
def delete_profile(profile_id: int, query=Depends(ProfileQueries)):
    try:
        query.delete_profile(profile_id)
        return {"result": True}
    except:
        return {"result": False}

# update login info
@router.put(
    "/api/account/{profile_id}",
    # response_model=Union[ProfileOut, ErrorMessage],
    responses={
        200: {"model": ProfileOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
def update_account(
    profile_id: int,
    profile: AccountUpdateIn,
    response: Response,
    query=Depends(ProfileQueries),
):
    try:
        row = query.update_account(
            profile_id,
            profile.username,
            profile.password,
            profile.first_name,
            profile.last_name,
        )
        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Account not found"}
        return row_to_account_update(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Duplicate username"}