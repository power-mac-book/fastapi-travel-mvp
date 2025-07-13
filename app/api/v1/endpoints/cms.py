from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from app.schemas.destination import DestinationCreate, DestinationOut
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.destination_service import create_destination, list_destinations
from app.core.logger import logger
from typing import List, Optional
import os
from uuid import uuid4
from app.core.config import settings
from app.schemas.cms_content import CMSContentOut, CMSContentCreate
from app.models.cms_content import CMSContent
from app.services.cms_service import create_cms_content

router = APIRouter()

@router.post("/upload", response_model=DestinationOut)
def upload_destination(
    name: str = Form(...),
    description: str = Form(""),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    image_path = None
    if image:
        ext = os.path.splitext(image.filename)[-1]
        file_id = f"{uuid4().hex}{ext}"
        image_path = os.path.join(settings.MEDIA_DIR, file_id)
        with open(image_path, "wb") as f:
            f.write(image.file.read())
        image_filename = file_id  # ✅ Store only the filename
    #return create_destination(db, name=name, description=description, image_path=image_path)
    # Save the file


        

    destination_data = DestinationCreate(
        name=name,
        description=description,
        image_path=image_filename
    )

    return create_destination(db, destination_data)

@router.get("/destinations", response_model=list[DestinationOut])
def list_all_destinations(db: Session = Depends(get_db)):
    return list_destinations(db)

@router.delete("/delete/{destination_id}", status_code=204)
def delete_destination(destination_id: int, db: Session = Depends(get_db)):
    destination = db.query(models.Destination).filter(models.Destination.id == destination_id).first()
    if not destination:
        raise HTTPException(status_code=404, detail="Destination not found")

    # Optionally delete the image file
    if destination.image_path:
        image_file = os.path.join(settings.MEDIA_DIR, destination.image_path)
        if os.path.exists(image_file):
            os.remove(image_file)

    db.delete(destination)
    db.commit()
    return
# app/api/v1/cms.py

@router.get("/info-sections", response_model=List[CMSContentOut])
def list_info_sections(db: Session = Depends(get_db)):
    return db.query(CMSContent).order_by(CMSContent.id.desc()).all()

@router.post("/info-sections", response_model=CMSContentOut)
def add_info_section(data: CMSContentCreate, db: Session = Depends(get_db)):
    return create_cms_content(db, data)
