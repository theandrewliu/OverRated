from fastapi.testclient import TestClient
from db.ratings import RatingQueries
from unittest import TestCase
from routers.profiles import get_current_user
from routers.ratings import create_rating
from main import app


class NormalRatingQueries(TestCase):
    def create_rating(self, rating, user_id, target_id):
        return [0, 1, 2, 3]


async def override_fake_rating():
    return {"rating": 4, "rating_of": 3}


async def override_get_fake_user():
    return {
        "id": 1,
        "username": "wowzer",
        "email": "wowzer@gmail.com",
        "full_name": "your mom",
    }


app.dependency_overrides[create_rating] = override_fake_rating
app.dependency_overrides[get_current_user] = override_get_fake_user

client = TestClient(app)


def test_create_rating():
    app.dependency_overrides[RatingQueries] = NormalRatingQueries
    app.dependency_overrides[get_current_user] = override_get_fake_user
    r = client.post(
        "/api/profiles/3/rating", json={"rating": 0, "rating_of": 0}
    )
    assert r.status_code == 200
    app.dependency_overrides = {}
