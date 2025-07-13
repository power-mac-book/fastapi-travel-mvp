from sqlalchemy.orm import Session
from app.models.destination import Destination
from app.schemas.destination import DestinationCreate



def list_destinations(db: Session):
    return db.query(Destination).order_by(Destination.id.desc()).all()

def get_destination(db: Session, destination_id: int) -> Destination | None:
    return db.query(Destination).filter(Destination.id == destination_id).first()

def update_destination(db: Session, destination_id: int, data: DestinationCreate) -> Destination | None:
    destination = get_destination(db, destination_id)
    if destination:
        for key, value in data.dict().items():
            setattr(destination, key, value)
        db.commit()
        db.refresh(destination)
    return destination

def create_destination(db: Session, destination: DestinationCreate) -> Destination:
    new_destination = Destination(
        name=destination.name,
        description=destination.description,
        image_path=destination.image_path
    )
    db.add(new_destination)
    db.commit()
    db.refresh(new_destination)
    return new_destination

