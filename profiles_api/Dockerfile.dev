FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /deps
COPY requirements.txt requirements.txt
RUN python -m pip install -r requirements.txt
WORKDIR /app
CMD uvicorn main:app --reload --host 0.0.0.0
