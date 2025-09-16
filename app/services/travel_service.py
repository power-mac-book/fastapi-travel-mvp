from sqlalchemy.orm import Session
from sqlalchemy import func  
from datetime import date
from app.models.travel import TravelRequest
from app.models.group_summary import TravelGroupSummary
from app.schemas.group_summary import TravelGroupSummaryOut
from app.schemas.travel import TravelRequestCreate
from typing import List, Optional
from app.core.email_utils import send_email
from datetime import timedelta
from app.core.config import settings

def create_travel_request(db: Session, data: TravelRequestCreate) -> TravelRequest:
    travel = TravelRequest(**data.dict())
    db.add(travel)
    db.commit()
    db.refresh(travel)

     # 1. Send email to traveler and admin
    subject = f"New Travel Interest for {data.destination}"
    body = (
        f"Thank you for your interest in {data.destination}.\n\n"
        f"Details:\n"
        f"Destination: {data.destination}\n"
        f"Travel Date: {data.travel_date}\n"
        f"Email: {data.user_email}\n"
        f"Phone: {data.phone_number}\n"
        f"Persons: {data.num_persons}\n"
    )
    #send_email(subject, body, [data.user_email, settings.ADMIN_EMAIL])
    # 2. Notify other travelers with similar interest ±7 days
    similar_date_start = data.travel_date - timedelta(days=7)
    similar_date_end = data.travel_date + timedelta(days=7)

    similar_travelers = db.query(TravelRequest).filter(
        TravelRequest.destination == data.destination,
        TravelRequest.travel_date.between(similar_date_start, similar_date_end),
        TravelRequest.user_email != data.user_email
    ).all()

    for other in similar_travelers:
        match_subject = f"Someone else is traveling to {data.destination} around {data.travel_date}"
        match_body = (
            f"Hi, someone else has shown interest in traveling to {data.destination} "
            f"around {data.travel_date}. You may be grouped together for better deals!\n\n"
            f"Stay tuned for further updates!"
        )
       # send_email(match_subject, match_body, [other.user_email])
    return travel

# def list_travel_requests(db: Session):
#     return db.query(TravelRequest).all()

def list_travel_requests(
    db: Session, 
    destination: str = None, 
    user_email: str = None,
    page: int = 1,
    limit: int = 10
):
    query = db.query(TravelRequest)
    if destination:
        query = query.filter(TravelRequest.destination == destination)
    if user_email:
        query = query.filter(TravelRequest.user_email == user_email)
    
    # Get total count before pagination
    total = query.count()
    
    # Add pagination
    offset = (page - 1) * limit
    requests = query.order_by(TravelRequest.travel_date.desc()).offset(offset).limit(limit).all()
    
    return {
        "requests": requests,
        "total": total,
        "page": page,
        "limit": limit
    }
    
    
def group_travel_requests(db: Session) -> list[dict]:
    """
    Dynamically group TravelRequest rows by destination & date.
    """
    results = (
        db.query(
            TravelRequest.destination,
            TravelRequest.travel_date,
            func.count(TravelRequest.id).label("user_count")
        )
        .group_by(TravelRequest.destination, TravelRequest.travel_date)
        .all()
    )
    return [
        {"destination": dest, "travel_date": date, "user_count": count}
        for dest, date, count in results
    ]
    
def get_group_summary(
    db: Session,
    destination: Optional[str] = None,
    from_date: Optional[date] = None,
    to_date: Optional[date] = None
) -> List[dict]:
    """
    Dynamically group TravelRequest rows by destination & date,
    with optional filters for destination, from_date, and to_date.
    """
    query = db.query(
        TravelRequest.destination,
        TravelRequest.travel_date,
        func.count(TravelRequest.id).label("user_count")
    )

    # Apply filters
    if destination:
        query = query.filter(TravelRequest.destination == destination)
    if from_date:
        query = query.filter(TravelRequest.travel_date >= from_date)
    if to_date:
        query = query.filter(TravelRequest.travel_date <= to_date)

    results = (
        query
        .group_by(TravelRequest.destination, TravelRequest.travel_date)
        .all()
    )

    # Convert to list of dicts
    return [
        {
            "destination": dest,
            "travel_date": tr_date,
            "user_count": count
        }
        for dest, tr_date, count in results
    ]
# ✅ Add this to travel_service.py
def get_trending_destinations(db: Session, limit: int = 5) -> List[dict]:
    """
    Get top N trending destinations based on number of persons interested
    within ±30 days from today.
    """
    today = date.today()
    from_date = today - timedelta(days=30)
    to_date = today + timedelta(days=30)

    results = (
        db.query(
            TravelRequest.destination,
            func.sum(TravelRequest.num_persons).label("total_persons")
        )
        .filter(TravelRequest.travel_date >= from_date)
        .filter(TravelRequest.travel_date <= to_date)
        .group_by(TravelRequest.destination)
        .order_by(func.sum(TravelRequest.num_persons).desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "destination": r.destination,
            "total_persons": r.total_persons
        }
        for r in results
    ]
