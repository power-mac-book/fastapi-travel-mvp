from app.db.session import engine
from app.models import base  # base imports all models

def init_db():
    print("Creating database tables...")
    base.Base.metadata.create_all(bind=engine)
    print("All tables created.")
