from fastapi.testclient import TestClient
from db.messages import MessageQueries
from unittest import TestCase
from routers.messages import create_message
from routers.profiles import get_current_user
from main import app


async def override_get_fake_user():
    return {
        "id": 2,
        "username": "user2",
        "email": "yesenia@gmail.com",
        "full_name": "Yesenia Ramirez",
    }


class TestMessageQueries(TestCase):
    def create_message(self, sender, recipient, sent, message):
        return [2, 1, 2, 1, "2022-06-23T18:46:11.143Z", "whats up loser"]


async def override_create_message():
    return {
        "id": 2,
        "match_id": 1,
        "sender": 2,
        "recipient": 1,
        "sent": "2022-06-23T18:46:11.143Z",
        "message": "whats up loser",
    }


app.dependency_overrides[get_current_user] = override_get_fake_user
app.dependency_overrides[create_message] = override_create_message

client = TestClient(app)


def test_create_message():
    app.dependency_overrides[MessageQueries] = TestMessageQueries
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.post(
        "/api/messages",
        json={"recipient": 0, "sent": "2022-06-23T18:46:11.142Z", "message": "string"},
    )
    d = r.json()
    print("d:", d)
    assert r.status_code == 200

    app.dependency_overrides = {}
