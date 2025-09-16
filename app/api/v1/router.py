from fastapi import APIRouter
from .endpoints import travel, dashboard, cms, admin_route, auth

api_router = APIRouter()

# Travel-related user actions
api_router.include_router(travel.router, prefix="/travel", tags=["Travel"])

# Dashboard grouping/summary
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

# CMS content uploads and listing
api_router.include_router(cms.router, prefix="/cms", tags=["CMS"])

# admin content uploads and listing
api_router.include_router(admin_route.router, prefix="/admin_route", tags=["Admin Auth"])

#from app.api.v1.endpoints import auth

api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])

