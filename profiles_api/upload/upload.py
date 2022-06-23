from botocore.client import BaseClient
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi import File, UploadFile
from db.profiles import ProfileQueries
from routers.accounts import User, get_current_user
from models.profiles import PhotoOut

from upload.deps import s3_auth
from upload.s3_upload import upload_file_to_bucket

router = APIRouter()


def row_to_photo(row):
    photo = {"current_user": row[0], "file_url": row[1]}
    return photo


@router.post(
    "/photo/{folder}",
    status_code=status.HTTP_201_CREATED,
    summary="Upload files to AWS S3 Buckets",
    description="Upload a valid file to AWS S3 bucket",
    name="POST files to AWS S3",
    response_description="Successfully uploaded file to S3 bucket",
    response_model=PhotoOut,
)
def upload_file(
    s3: BaseClient = Depends(s3_auth),
    file_obj: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    query=Depends(ProfileQueries),
):
    file_url = upload_file_to_bucket(
        s3_client=s3,
        file_obj=file_obj.file,
        bucket="overrated-photos",
        folder="profile-photos",
        object_name=file_obj.filename,
    )

    if file_url:
        row = query.upload_photo(current_user["id"], file_url)

        return row_to_photo(row)
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="File could not be uploaded",
        )
