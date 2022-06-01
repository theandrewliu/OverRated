from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.profiles import (
    ProfileIn,
    ProfileOut,
    ProfileList,
    ProfileDeleteOperation
)
from models.common import ErrorMessage
from db import ProfileQueries, DuplicateProfile

router = APIRouter()


def row_to_profile(row):
    profile = {
        "id": row[0],
        "first_name":row[1],
        "last_name":row[2],
        "date_of_birth":row[4],
        "location":row[3],
        "photo":row[5],
        "about":row[6],
        "height":row[7],
        "job":row[8],
        "education":row[9],
        "gender":row[10],
        "sexual_orientation":row[11],
        "religion":row[12],
        "ethnicity":row[13],
        "pronouns":row[14],
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



