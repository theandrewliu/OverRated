from pydantic import BaseSettings
import os


class Settings(BaseSettings):
    AWS_SERVER_PUBLIC_KEY: str
    AWS_SERVER_SECRET_KEY: str


settings = Settings(
    AWS_SERVER_PUBLIC_KEY=os.environ["AWS_SERVER_PUBLIC_KEY"],
    AWS_SERVER_SECRET_KEY=os.environ["AWS_SERVER_SECRET_KEY"],
)
