from pydantic import BaseModel


class ErrorMessage(BaseModel):
    message: str
