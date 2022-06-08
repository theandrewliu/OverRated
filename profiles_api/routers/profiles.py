from datetime import date
from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.profiles import (
    ProfileList,
    ProfileDeleteOperation,
    ProfileCreateIn,
    ProfileUpdateIn,
    AccountUpdateIn,
    ProfileUpdateOut,
    AccountUpdateOut,
    ProfileOutWithInterested,
    SwipedIn,
    SwipedOut,
    MatchedList
)
from models.common import ErrorMessage
from db import ProfileQueries, DuplicateUsername, DuplicateTarget
from routers.accounts import pwd_context, User, get_current_user, HttpError


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


def row_to_profile_swiped(row):
    profile = {
        "id": row[0],
        "active_user_id": row[1],
        "target_user_id": row[2],
        "liked": row[3]
    }
    return profile


def row_to_matched_list(row):
    match = {
        "id": row[0],
        "photo": row[1],
        "first_name": row[2],
        "last_name": row[3],
        "location": row[4],
        "date_of_birth": row[5]
    }
    return match


# not using this anywhere at the moment 
@router.get(
    "/api/profiles",
    response_model=ProfileList,
)
async def get_profiles(page: int=0, query=Depends(ProfileQueries), current_user: User = Depends(get_current_user)):
    page_count, rows = query.get_all_profiles(current_user["id"], page)
    return {
        "page_count": page_count,
        "profiles": [row_to_profile_list(row) for row in rows],
    }



@router.get(
    "/api/profiles/mine",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses = {
        200: {"model": ProfileOutWithInterested},
        404: {"model": ErrorMessage}
    }
)
def get_my_profile(response: Response, query=Depends(ProfileQueries), current_user: User = Depends(get_current_user)):
    print("current user", current_user)
    row = query.get_profile(current_user['id'])
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return row_to_profile(row)



# detail view of a specific profile
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



#to get a random profile 
@router.get(
    "/api/random",
    response_model=Union[ProfileOutWithInterested, ErrorMessage],
    responses = {
        200: {"model": ProfileOutWithInterested},
        404: {"model": ErrorMessage}
    }
)
def get_random_profile(response: Response, query=Depends(ProfileQueries), current_user: User = Depends(get_current_user)):
    row = query.get_random_profile(current_user['id'])
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
    "/api/profiles/myself",
    response_model=Union[ProfileUpdateOut, ErrorMessage],
    responses={
        200: {"model": ProfileUpdateOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
async def update_profile(
    # profile_id: int,
    profile: ProfileUpdateIn,
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user),
    # profile_id: current_user["id"],
):
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
            profile.interested
        )

        if row is None:
            response.status_code = status.HTTP_404_NOT_FOUND
            return {"message": "Profile not found"}
        return row_to_profile_update(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Duplicate profile name"}


@router.delete(
    "/api/profiles/myself",
    response_model=ProfileDeleteOperation,
)
def delete_profile(current_user: User = Depends(get_current_user), query=Depends(ProfileQueries)):
    try:
        query.delete_profile(current_user["id"])
        return {"result": True}
    except:
        return {"result": False}


# update login info
@router.put(
    "/api/accounts/myself",
    response_model=Union[AccountUpdateOut, ErrorMessage],
    responses={
        200: {"model": AccountUpdateOut},
        404: {"model": ErrorMessage},
        409: {"model": ErrorMessage},
    },
)
def update_account(
    profile: AccountUpdateIn,
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user)
):
    try:
        hashed_password = pwd_context.hash(profile.password)
        row = query.update_account(
            current_user["id"],
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


@router.post(
    "/api/profiles/{target_user_id}/liked",
    response_model=Union[SwipedOut, ErrorMessage],
    responses={
        200: {"model": SwipedOut},
        409: {"model": ErrorMessage}
    },
)
def liked(
    profile: SwipedIn,
    target_user_id: int,
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user)
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


@router.post(
    "/api/profiles/{target_user_id}/disliked",
    response_model=Union[SwipedOut, ErrorMessage],
    responses={
        200: {"model": SwipedOut},
        409: {"model": ErrorMessage}
    },
)
def disliked(
    profile: SwipedIn,
    target_user_id: int,
    response: Response,
    query=Depends(ProfileQueries),
    current_user: User = Depends(get_current_user)
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


@router.get(
    "/api/my-matches",
    response_model=MatchedList,
)

async def get_matches(page: int=0, query=Depends(ProfileQueries), current_user: User = Depends(get_current_user)):
    page_count, rows = query.list_matches(current_user["id"], page)
    return {
        "page_count": page_count,
        "matches": [row_to_matched_list(row) for row in rows],
    }