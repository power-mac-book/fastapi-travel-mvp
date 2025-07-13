from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date

from app.db.session import get_db
from app.services.travel_service import get_group_summary

router = APIRouter()

@router.get("/summary", response_model=List[dict])
def dashboard_summary(
    destination: Optional[str] = Query(None, description="Filter by destination"),
    from_date: Optional[date] = Query(None, alias="fromDate", description="Start date (YYYY-MM-DD)"),
    to_date:   Optional[date] = Query(None, alias="toDate", description="End date (YYYY-MM-DD)"),
    db: Session = Depends(get_db),
):
    """
    Returns grouped counts by destination and date.
    Optional query parameters:
      - destination
      - fromDate (as YYYY-MM-DD)
      - toDate   (as YYYY-MM-DD)
    """
    return get_group_summary(db, destination, from_date, to_date)
