from fastapi.testclient import TestClient
from db.profiles import ProfileQueries
from db.matches import MatchQueries
from unittest import TestCase
from routers.profiles import (
    get_profiles,
    get_current_user,
)
from routers.matches import liked, disliked
from main import app


class NormalProfileQueries(TestCase):
    def get_all_profiles(self, user_id, page: int = 0):
        return 1, [
            [
                9,
                "test",
                "test",
                "test",
                "test",
                "test",
                "2002-02-22",
                "test",
                "test",
                0,
                "test",
                "test",
                "test",
                "test",
                "test",
                "test",
                "test",
            ]
        ]


class NormalMatchQueries(TestCase):
    def like_profile(self, id, target_user):
        return [1, 1, 2, True]

    def dislike_profile(self, id, target_user):
        return [1, 1, 2, True]


async def override_fake_like():
    return {"id": 1, "active_user_id": 2, "target_user_id": 3, "liked": True}
    # return {'target_user_id': 1}


async def override_fake_disliked():
    return {"id": 1, "active_user_id": 2, "target_user_id": 3, "liked": True}


async def override_get_fake_user():
    return {
        "id": 1,
        "username": "wowzer",
        "email": "wowzer@gmail.com",
        "full_name": "your mom",
    }


async def override_get_profiles():
    return {
        "page_count": 0,
        "profiles": [
            {
                "id": 0,
                "username": "string",
                "email": "string",
                "first_name": "string",
                "last_name": "string",
                "location": "string",
                "date_of_birth": "2022-06-22",
                "photo": "string",
                "about": "string",
                "height": 0,
                "job": "string",
                "education": "string",
                "gender": "string",
                "sexual_orientation": "string",
                "religion": "string",
                "ethnicity": "string",
                "pronouns": "string",
            }
        ],
    }


app.dependency_overrides[get_profiles] = override_get_profiles
app.dependency_overrides[liked] = override_fake_like
app.dependency_overrides[disliked] = override_fake_disliked
app.dependency_overrides[get_current_user] = override_get_fake_user


client = TestClient(app)


def test_profile_list():
    app.dependency_overrides[ProfileQueries] = NormalProfileQueries
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.get("/api/profiles")
    # d = r.json()

    assert r.status_code == 200

    app.dependency_overrides = {}


def test_disliked():
    app.dependency_overrides[MatchQueries] = NormalMatchQueries
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.post(
        "/api/profiles/1/disliked",
        json={
            "target_user_id": 3,
        },
    )

    assert r.status_code == 200

    app.dependency_overrides = {}


def test_like():
    app.dependency_overrides[MatchQueries] = NormalMatchQueries
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.post(
        "/api/profiles/1/liked",
        json={
            "target_user_id": 3,
        },
    )
    # d = r.json()

    assert r.status_code == 200

    app.dependency_overrides = {}
