from sqlalchemy.orm import Session
from app.models.cms_content import CMSContent
from app.schemas.cms_content import CMSContentCreate

def create_cms_content(db: Session, data: CMSContentCreate) -> CMSContent:
    content = CMSContent(**data.dict())
    db.add(content)
    db.commit()
    db.refresh(content)
    return content

def list_cms_content(db: Session):
    return db.query(CMSContent).all()
