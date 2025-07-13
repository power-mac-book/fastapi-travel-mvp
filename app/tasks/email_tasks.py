from app.core.email_utils import send_email
from fastapi import BackgroundTasks

async def send_interest_emails(background_tasks: BackgroundTasks, request_data: dict):
    # Send to traveler
    background_tasks.add_task(
        send_email,
        to_email=request_data["user_email"],
        subject="Thanks for showing interest!",
        template_name="interest_notification.html",
        context=request_data
    )

    # Send to admin
    background_tasks.add_task(
        send_email,
        to_email=request_data["admin_email"],
        subject="New Travel Interest Submitted",
        template_name="interest_notification.html",
        context=request_data
    )
