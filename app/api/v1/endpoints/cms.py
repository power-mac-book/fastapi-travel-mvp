import json
import os
import shutil
from typing import List, Optional
from uuid import uuid4
from app.core.config import settings
from app.core.logger import logger
from app.db.session import get_db
from app.models.cms_content import CMSContent
from app.schemas.cms_content import CMSContentCreate, CMSContentOut
from app.schemas.destination import DestinationCreate, DestinationOut
from app.services.cms_service import create_cms_content
from app.services.destination_service import create_destination, list_destinations
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/upload", response_model=DestinationOut)
def upload_destination(
    name: str = Form(...),
    description: str = Form(""),
    itinerary: str = Form(""),
    inclusions: str = Form(""),
    exclusions: str = Form(""),
    highlights: str = Form("[]"),  # JSON stringified list
    image: UploadFile = File(None),
    gallery: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
):
    try:
        image_filename = None
        gallery_filenames = []

        # Save main image
        if image:
            ext = os.path.splitext(image.filename)[-1]
            file_id = f"{uuid4().hex}{ext}"
            image_path = os.path.join(settings.MEDIA_DIR, file_id)
            with open(image_path, "wb") as f:
                shutil.copyfileobj(image.file, f)
            image_filename = file_id

        # Save gallery images (max 5)
        if gallery:
            for g_file in gallery[:5]:
                ext = os.path.splitext(g_file.filename)[-1]
                g_id = f"{uuid4().hex}{ext}"
                g_path = os.path.join(settings.MEDIA_DIR, g_id)
                with open(g_path, "wb") as f:
                    shutil.copyfileobj(g_file.file, f)
                gallery_filenames.append(g_id)

        # Parse highlights list
        parsed_highlights = json.loads(highlights)

        destination_data = DestinationCreate(
            name=name,
            description=description,
            image_path=image_filename,
            itinerary=itinerary,
            inclusions=inclusions,
            exclusions=exclusions,
            highlights=parsed_highlights,
            gallery=gallery_filenames,
        )

        return create_destination(db, destination_data)

    except Exception as e:
        logger.error(f"Failed to upload destination: {e}")
        raise HTTPException(status_code=500, detail="Upload failed.")


@router.get("/destinations", response_model=list[DestinationOut])
def list_all_destinations(db: Session = Depends(get_db)):
    return list_destinations(db)


@router.delete("/delete/{destination_id}", status_code=204)
def delete_destination(destination_id: int, db: Session = Depends(get_db)):
    destination = (
        db.query(models.Destination)
        .filter(models.Destination.id == destination_id)
        .first()
    )
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


@router.get("/info-sections", response_model=List[CMSContentOut])
def list_info_sections(db: Session = Depends(get_db)):
    return db.query(CMSContent).order_by(CMSContent.id.desc()).all()


@router.post("/info-sections", response_model=CMSContentOut)
def add_info_section(data: CMSContentCreate, db: Session = Depends(get_db)):
    return create_cms_content(db, data)

