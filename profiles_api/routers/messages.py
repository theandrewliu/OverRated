from fastapi import APIRouter, Depends, Response, status
from typing import Union
from models.messages import (
    MessageList,
    MessageOut,
    MessageIn,
    MessageDetailListOut,
)
from models.common import ErrorMessage
from db.messages import MessageQueries, DuplicateUsername
from routers.accounts import User, get_current_user


router = APIRouter()


def row_to_message_list(row):
    message = {
        "id": row[3][0],
        "photo": row[0],
        "first_name": row[1],
        "last_name": row[2],
        "match_id": row[3][1],
        "sender": row[3][2],
        "recipient": row[3][3],
        "sent": row[3][4],
        "message": row[3][5],
    }
    return message


def row_to_message(row):
    message = {
        "id": row[0],
        "match_id": row[1],
        "sender": row[2],
        "recipient": row[3],
        "sent": row[4],
        "message": row[5],
    }
    return message


def row_to_message_detail(row):
    message = {
        "id": row[0],
        "sender": row[1],
        "recipient": row[2],
        "sent": row[3],
        "message": row[4],
    }
    return message


# ---- Get a list of the 3 most recent conversations ---- #
@router.get(
    "/api/messages",
    response_model=MessageList,
)
async def get_messages(
    query=Depends(MessageQueries),
    current_user: User = Depends(get_current_user),
):
    rows = query.list_messages(current_user["id"])
    return {
        "messages": [row_to_message_list(row) for row in rows],
    }


# ---- Send a message ---- #
@router.post(
    "/api/messages",
    response_model=Union[MessageOut, ErrorMessage],
    responses={200: {"model": MessageOut}, 409: {"model": ErrorMessage}},
)
def create_message(
    profile: MessageIn,
    response: Response,
    query=Depends(MessageQueries),
    current_user: User = Depends(get_current_user),
):
    try:
        row = query.create_message(
            current_user["id"],
            profile.recipient,
            profile.sent,
            profile.message,
        )
        return row_to_message(row)
    except DuplicateUsername:
        response.status_code = status.HTTP_409_CONFLICT
        return {"message": "error message"}


# ---- Get all the messages from one conversation ---- #
@router.get(
    "/api/messages/{target_id}",
    response_model=Union[MessageDetailListOut, ErrorMessage],
    responses={
        200: {"model": MessageDetailListOut},
        404: {"model": ErrorMessage},
    },
)
def get_message(
    target_id: int,
    response: Response,
    query=Depends(MessageQueries),
    current_user: User = Depends(get_current_user),
):
    rows = query.get_messages(current_user["id"], target_id)
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Profile does not exist"}
    return {"messages": [row_to_message_detail(row) for row in rows]}
