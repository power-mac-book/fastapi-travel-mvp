from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings
from app.models.base import Base
import psycopg2
from contextlib import contextmanager
import logging

logger = logging.getLogger(__name__)

class TenantDatabaseManager:
    def __init__(self):
        self.base_db_url = f"postgresql://{settings.POSTGRES_USER}:{settings.POSTGRES_PASSWORD}@{settings.POSTGRES_SERVER}:{settings.POSTGRES_PORT}"
        self.admin_engine = create_engine(f"{self.base_db_url}/{settings.POSTGRES_DB}")

    def create_tenant_database(self, db_name: str) -> bool:
        """Create a new database for tenant"""
        try:
            with psycopg2.connect(
                f"{self.base_db_url}/postgres"
            ) as connection:
                connection.autocommit = True
                with connection.cursor() as cursor:
                    cursor.execute(f'CREATE DATABASE "{db_name}"')
            
            # Initialize the new database with our schema
            tenant_engine = create_engine(f"{self.base_db_url}/{db_name}")
            Base.metadata.create_all(tenant_engine)
            return True
        except Exception as e:
            logger.error(f"Failed to create tenant database: {str(e)}")
            return False

    def get_tenant_session(self, db_name: str):
        """Get a session for a specific tenant's database"""
        engine = create_engine(f"{self.base_db_url}/{db_name}")
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
        return SessionLocal()

    @contextmanager
    def tenant_scope(self, db_name: str):
        """Context manager for tenant database sessions"""
        session = self.get_tenant_session(db_name)
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()

tenant_db_manager = TenantDatabaseManager()
