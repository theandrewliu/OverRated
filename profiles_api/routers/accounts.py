from datetime import datetime, timedelta
from db.profiles import ProfileQueries, DuplicateUsername
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    Cookie,
    APIRouter,
    Request,
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt, jws, JWSError
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
from json.decoder import JSONDecodeError
import os

from models.accounts import AccountUpdateIn, AccountUpdateOut
from typing import Union
from models.common import ErrorMessage


SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
COOKIE_NAME = "overrated_token"


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)


class HttpError(BaseModel):
    detail: str


class TokenData(BaseModel):
    username: str


class AccessToken(BaseModel):
    token: str


class User(BaseModel):
    id: int
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserSignUp(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None
    password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_user(repo: ProfileQueries, username: str):
    row = repo.get_profile_from_username(username)
    if not row:
        return None
    return {"id": row[0], "username": row[1], "password": row[2]}


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(repo: ProfileQueries, username: str, password: str):
    user = get_user(repo, username)
    if not user:
        return False
    if not verify_password(password, user["password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(
    bearer_token: Optional[str] = Depends(oauth2_scheme),
    cookie_token: Optional[str]
    | None = Cookie(default=None, alias=COOKIE_NAME),
    repo: ProfileQueries = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = bearer_token
    try:
        if not token and cookie_token:
            token = cookie_token
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, AttributeError, JSONDecodeError) as e:
        print("hello", e)
        raise credentials_exception
    user = get_user(repo, username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
):
    # if current_user.disabled:
    # raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token")
async def login_for_access_token(
    response: Response,
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    repo: ProfileQueries = Depends(),
):
    user = authenticate_user(repo, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]},
        expires_delta=access_token_expires,
    )
    token = {"access_token": access_token, "token_type": "bearer"}

    samesite = "none"
    secure = True
    if (
        "origin" in request.headers
        and "localhost" in request.headers["origin"]
    ):
        samesite = "lax"
        secure = False
    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
    return token


@router.get("/token", response_model=AccessToken)
async def get_token(request: Request):
    if COOKIE_NAME in request.cookies:
        return {"token": request.cookies[COOKIE_NAME]}


@router.get(
    "/users/me",
    response_model=User,
    responses={
        200: {"model": User},
        400: {"model": HttpError},
        401: {"model": HttpError},
    },
)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/token/validate")
async def validate_token(access_token: AccessToken, response: Response):
    try:
        return jws.verify(access_token.token, SECRET_KEY, algorithms=ALGORITHM)
    except JWSError:
        response.status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"detail": "Not a good token"}


@router.delete("/token")
async def logout(request: Request, response: Response):
    samesite = "none"
    secure = True
    if (
        "origin" in request.headers
        and "localhost" in request.headers["origin"]
    ):
        samesite = "lax"
        secure = False
    response.delete_cookie(
        key=COOKIE_NAME,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )


def row_to_account_update(row):
    profile = {
        "id": row[0],
        "username": row[1],
        "email": row[2],
        "first_name": row[3],
        "last_name": row[4],
    }
    return profile


# ---- Update account info ---- #
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
    current_user: User = Depends(get_current_user),
):
    try:
        hashed_password = pwd_context.hash(profile.password)
        row = query.update_account(
            current_user["id"],
            profile.username,
            profile.email,
            hashed_password,
            profile.first_name,
            profile.last_name,
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
