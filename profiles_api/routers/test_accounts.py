from fastapi import FastAPI
from fastapi.testclient import TestClient

from profiles_api.routers.profiles import row_to_profile, get_profile

client = FastAPI()

def test_get_profile(client, query):
    profile_id = 1
    row = query.get_profile(profile_id)
    assert row is not None
    assert row_to_profile(row) == {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "interested": [1,2,3]
    }