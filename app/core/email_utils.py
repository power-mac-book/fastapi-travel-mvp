from email.message import EmailMessage
from jinja2 import Environment, FileSystemLoader
import aiosmtplib
from app.core.config import settings
import os

env = Environment(loader=FileSystemLoader(os.path.join(os.path.dirname(__file__), "..", "templates", "email")))

async def send_email(to_email: str, subject: str, template_name: str, context: dict):
    template = env.get_template(template_name)
    content = template.render(context)

    message = EmailMessage()
    message["From"] = settings.SMTP_SENDER
    message["To"] = to_email
    message["Subject"] = subject
    message.set_content(content, subtype="html")

    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
        start_tls=True
    )
