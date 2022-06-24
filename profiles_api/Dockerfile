FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY __init__.py __init__.py

# Copy all of the directories that contain your application
# code
COPY models models
COPY routers routers
COPY upload upload
COPY db db

RUN pip install -r requirements.txt
CMD uvicorn main:app --reload --host 0.0.0.0 --port $PORT
