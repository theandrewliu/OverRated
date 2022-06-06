from datetime import date
from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.profiles import (
    ProfileList,
    ProfileDeleteOperation,
    ProfileOut,
    ProfileCreateIn,
    ProfileUpdateIn,
    AccountUpdateIn,
    ProfileUpdateOut,
    AccountUpdateOut,
    ProfileOutWithInterested
)
from models.common import ErrorMessage
from db import ProfileQueries, DuplicateUsername
from routers.accounts import pwd_context

router = APIRouter()


def row_to_profile_list(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "first_name":row[3],
        "last_name":row[4],
        "date_of_birth":row[6],
        "location":row[5],
        "photo":row[7],
        "about":row[8],
        "height":row[9],
        "job":row[10],
        "education":row[11],
        "gender":row[12],
        "sexual_orientation":row[13],
        "religion":row[14],
        "ethnicity":row[15],
        "pronouns":row[16]
    }
    return profile

def row_to_profile(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "first_name":row[3],
        "last_name":row[4],
        "date_of_birth":row[6],
        "location":row[5],
        "photo":row[7],
        "about":row[8],
        "height":row[9],
        "job":row[10],
        "education":row[11],
        "gender":row[12],
        "sexual_orientation":row[13],
        "religion":row[14],
        "ethnicity":row[15],
        "pronouns":row[16],
        "interested":row[17]
    }
    return profile


def row_to_profile_post(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "password": row[3],
        "first_name":row[4],
        "last_name":row[5],
        "date_of_birth":row[7],
        "location":row[6],
        "interested":row[8]
    }
    return profile


def row_to_profile_update(row):
    profile = {
        "id": row[0],
        "location":row[5],
        "photo":row[7],
        "about":row[8],
        "height":row[9],
        "job":row[10],
        "education":row[11],
        "gender":row[12],
        "sexual_orientation":row[13],
        "religion":row[14],
        "ethnicity":row[15],
        "pronouns":row[16],
        "interested":row[17]
    }
    return profile


def row_to_account_update(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
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
        "profiles": [row_to_profile_list(row) for row in rows],
    }


@router.get(
    "/api/profiles/{profile_id}",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses = {
        200: {"model": ProfileOutWithInterested},
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
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses={
        200: {"model": ProfileOutWithInterested},
        409: {"model": ErrorMessage}
    },
)
def create_profile(
    profile: ProfileCreateIn,
    response: Response,
    query=Depends(ProfileQueries)
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
            profile.interested
        )
        return row_to_profile_post(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": f"{profile.username} username already exists"}


# update personal info
@router.put(
    "/api/profiles/{profile_id}",
    response_model=Union[ProfileUpdateOut, ErrorMessage],
    responses={
        200: {"model": ProfileUpdateOut},
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
            profile.pronouns,
            profile.interested
        )
        # return ProfileUpdateOut(
        #         id = row[0],
        #         location = row[5],
        #         photo = row[7],
        #         about= row[8],
        #         height= row[9],
        #         job= row[10],
        #         education= row[12],
        #         gender= row[12],
        #         sexual_orientation= row[13],
        #         religion= row[14],
        #         ethnicity= row[15],
        #         pronouns= row[16],
        #     )
    # except:
    #     return("this did not work")
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
    "/api/accounts/{profile_id}",
    response_model=Union[AccountUpdateOut, ErrorMessage],
    responses={
        200: {"model": AccountUpdateOut},
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
        hashed_password = pwd_context.hash(profile.password)
        row = query.update_account(
            profile_id,
            profile.username,
            profile.email,
            hashed_password,
            profile.first_name,
            profile.last_name
        )
        # return AccountUpdateOut(
        #     id=row[0],
        #     username=row[1],
        #     first_name=row[2],
        #     last_name=row[3],
        # )
        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Account not found"}
        return row_to_account_update(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Duplicate username"}

#patience 