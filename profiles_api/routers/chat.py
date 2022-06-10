from fastapi import (
    APIRouter,
    WebSocket,
    WebSocketDisconnect,
)
from typing import List
import json
from datetime import datetime, timezone


router = APIRouter()
# Back End

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
        payload = json.dumps({
            "profile": profile,
            "content": message,
            "timestamp": timestamp(),
            "message_id": self.next_message_id(),
        })
        await websocket.send_text(payload)

    async def broadcast(self, message: str, profile: str):
        payload = json.dumps({
            "profile": profile,
            "content": message,
            "timestamp": timestamp(),
            "message_id": self.next_message_id(),
        })
        print('active connections:', len(self.active_connections))
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
):
    await manager.connect(websocket, profile)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message, profile)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast("Disconnected", profile)