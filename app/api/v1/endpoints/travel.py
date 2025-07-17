from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.schemas.travel import TravelRequestCreate, TravelRequestOut
from app.services.travel_service import create_travel_request, list_travel_requests, group_travel_requests, get_trending_destinations
from typing import List, Optional
from datetime import date
from app.tasks.email_tasks import send_interest_emails
from app.models.travel import TravelRequest
from app.schemas.travel import TravelRequestOut
from app.core.config import settings

router = APIRouter()

@router.post("/", response_model=TravelRequestOut, status_code =201)
def submit_travel_request(request: TravelRequestCreate, db: Session = Depends(get_db)):
    return create_travel_request(db, request)

@router.get("/", response_model=List[TravelRequestOut])
def get_travel_requests(destination: Optional[str] = None, user_email: Optional[str] = None, db: Session = Depends(get_db)):
    return list_travel_requests(db, destination, user_email)
    
@router.get("/grouped", response_model=list[dict])
def get_grouped_requests(db: Session = Depends(get_db)):
    return group_travel_requests(db)



@router.post("/", response_model=TravelRequestOut)
def submit_travel_request(
    request: TravelRequestCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    saved_request = create_travel_request(db, request)

    # email context
    email_context = {
        "destination": request.destination,
        "travel_date": request.travel_date,
        "user_email": request.user_email,
        "phone_number": request.phone_number,
        "num_persons": request.num_persons,
        "admin_email": settings.ADMIN_EMAIL
    }

    background_tasks.add_task(send_interest_emails, background_tasks, email_context)
    return saved_request

# 👇 Add this endpoint at the bottom of travel.py
@router.get("/trending", tags=["Public"])
def trending_destinations(db: Session = Depends(get_db)):
    return get_trending_destinations(db)

@router.get("/destination-interest-dates/{destination_name}")
def get_interest_dates(destination_name: str, db: Session = Depends(get_db)):
    results = (
        db.query(
            TravelRequest.travel_date,
            func.count(TravelRequest.id).label("interest_count")
        )
        .filter(TravelRequest.destination == destination_name)
        .group_by(TravelRequest.travel_date)
        .order_by(TravelRequest.travel_date)
        .all()
    )

    # Convert results to list of dicts
    return [
        {"travel_date": r.travel_date, "interest_count": r.interest_count}
        for r in results
    ]


