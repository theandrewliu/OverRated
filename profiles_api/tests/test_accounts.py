from fastapi.testclient import TestClient
from db.profiles import ProfileQueries
from unittest import TestCase
from routers.profiles import get_current_user
from routers.accounts import update_account
from main import app


class AccountInfo(TestCase):
    def update_account(
        self, id, username, email, password, first_name, last_name
    ):
        return [10, "test", "test", "test", "test"]


async def override_get_fake_user():
    return {
        "id": 1,
        "username": "TailsPrower",
        "email": "Tails@Sonic.com",
        "full_name": "Tails Prower",
    }


async def override_update_account():
    return {
        "id": 1,
        "username": "TailsPrower",
        "email": "TailsheartSonic@Sonic.com",
        "first_name": "Tails",
        "last_name": "Sonic",
    }


app.dependency_overrides[update_account] = override_update_account
app.dependency_overrides[get_current_user] = override_get_fake_user

client = TestClient(app)


def test_update_account():
    app.dependency_overrides[ProfileQueries] = AccountInfo
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.put(
        "/api/accounts/myself",
        json={
            "username": "string",
            "email": "string",
            "password": "string",
            "first_name": "string",
            "last_name": "string",
        },
    )
    d = r.json()
    print("today", d)
    assert r.status_code == 200

    app.dependency_overrides = {}
