from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List
import json
from datetime import datetime, timezone
from db import ProfileQueries
from routers.accounts import User, get_current_user


router = APIRouter()


def timestamp():
    return datetime.now(timezone.utc).isoformat()


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.current_message_id = 0

    async def connect(
        self,
        websocket: WebSocket,
        profile: str,
    ):
        await websocket.accept()
        self.active_connections.append(websocket)
        await self.send_personal_message(
            "Welcome!",
            profile,
            websocket,
        )

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(
        self,
        message: str,
        profile: str,
        websocket: WebSocket,
    ):
        payload = json.dumps(
            {
                "profile": profile,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )
        await websocket.send_text(payload)

    async def broadcast(self, message: str, profile: str):
        payload = json.dumps(
            {
                "profile": profile,
                "content": message,
                "timestamp": timestamp(),
                "message_id": self.next_message_id(),
            }
        )
        print("active connections:", len(self.active_connections))
        for connection in self.active_connections:
            await connection.send_text(payload)

    def next_message_id(self):
        self.current_message_id += 1
        return self.current_message_id


manager = ConnectionManager()


@router.websocket("/chat/{profile}")
async def websocket_endpoint(
    websocket: WebSocket,
    profile: str,
    current_user: User = Depends(get_current_user),
    query=Depends(ProfileQueries),
):
    await manager.connect(websocket, profile)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, profile)
            test = query.create_message(
                current_user["id"], profile, timestamp(), message
            )
            return {
                "id": test[0],
                "match_id": test[1],
                "sender": test[2],
                "recipient": test[3],
                "sent": test[4],
                "message": test[5],
            }
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Disconnected", profile)
