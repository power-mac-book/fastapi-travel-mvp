"# SmartGroup Travel MVP - Multi-tenant Travel Management System

## Overview
SmartGroup Travel MVP is a multi-tenant travel management system built with FastAPI and React. The system allows multiple travel organizations to manage their own travel requests and admin users in isolated environments.

## System Architecture

### Backend (FastAPI)
- **Multi-tenant Architecture**: Each tenant gets their own isolated database
- **Authentication**: JWT-based authentication with token blacklisting
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Caching**: Redis for token blacklisting and session management
- **Task Queue**: Celery for background tasks (email notifications)

### Frontend
- **Admin Dashboard**: React-based admin interface (`smartgroup-admin-react`)
- **Traveler UI**: Public-facing React application (`smartgroup-traveler-ui`)
- **State Management**: Local state with Context API
- **UI Framework**: Tailwind CSS

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 16+ and npm
- Python 3.11+

### Environment Setup
1. Clone the repository:
```bash
git clone https://github.com/power-mac-book/fastapi-travel-mvp.git
cd fastapi-travel-mvp
```

2. Create `.env` file in root directory:
```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=travel_db
POSTGRES_SERVER=db
POSTGRES_PORT=5432

# Redis
REDIS_URL=redis://redis:6379/0

# Email
EMAIL_FROM=dev@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=smtp-user
SMTP_PASSWORD=smtp-pass
ADMIN_EMAIL=admin@example.com

# Media
MEDIA_DIR=app/uploads
```

For detailed documentation, see the [docs](./docs) directory." 
