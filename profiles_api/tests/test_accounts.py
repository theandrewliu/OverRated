from fastapi import FastAPI
from fastapi.testclient import TestClient
from db.profiles import ProfileQueries
from unittest import TestCase
from routers.profiles import get_current_user
from routers.accounts import update_account
from main import app


class AccountInfo(TestCase):
    def get_all_profiles(self, user_id, page: int=0):
        return 1, [
           [10, "test", "test", "test", "test", "test"]
        ]

async def override_get_fake_user():
  return {'id': 1, 'username': 'TailsPrower', 'email': 'Tails@Sonic.com', 
    "first_name": 'Tails', "last_name": "Prower", "password": "lovesonic"}

async def override_update_account():
  return {'id': 1, 'username': 'TailsSonic', 'email': 'TailsheartSonic@Sonic.com', 
    "first_name": 'Tails', "last_name": "Sonic", "password": "lovesonic"}

async def override_get_account():
    return  {
  "page_count": 0,
  "profiles": [
    {
      "id": 0,
      "username": "string",
      "email": "string",
      "first_name": "string",
      "last_name": "string",
      "password": "string",
    }
  ]
}


app.dependency_overrides[update_account] = override_update_account
app.dependency_overrides[get_current_user] = override_get_fake_user

client = TestClient(app)

def test_profile_list():
    app.dependency_overrides[ProfileQueries] = AccountInfo
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.get("/api/accounts/myself")
    # d = r.json()

    assert r.status_code == 200

    app.dependency_overrides = {}