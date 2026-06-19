from fastapi import FastAPI, APIRouter, HTTPException, BackgroundTasks
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
import smtplib
import ssl
from email.message import EmailMessage
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Optional
import uuid
from datetime import datetime


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# SMTP config (Gmail)
SMTP_HOST = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')
SMTP_FROM_NAME = os.environ.get('SMTP_FROM_NAME', 'Humanity Care College')
APPLICATION_RECIPIENT = os.environ.get('APPLICATION_RECIPIENT', 'educafirst1@gmail.com')

app = FastAPI(title="Humanity Care College API")
api_router = APIRouter(prefix="/api")

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============= Models =============
class ApplicationCreate(BaseModel):
    fullName: str
    email: EmailStr
    phone: str
    dob: Optional[str] = ""
    gender: Optional[str] = ""
    course: str
    qualification: Optional[str] = ""
    address: Optional[str] = ""
    message: Optional[str] = ""


# ============= Email helper =============
COURSE_NAMES = {
    "BBA": "Bachelor of Business Administration",
    "BCA": "Bachelor of Computer Applications",
    "BJMC": "Bachelor of Journalism & Mass Communication",
    "BLIS": "Bachelor of Library and Information Science",
    "DOL": "Diploma in Oriental Librarianship",
    "APRI": "Accountancy for Panchayti Raj Institutions",
    "FA": "Functional Arabic",
    "FP": "Functional Persian",
    "ANM": "Auxiliary Nursing Midwifery",
    "GNM": "General Nursing and Midwifery",
    "BSCN": "B.Sc (Nursing)",
}


def build_email_html(app_payload: ApplicationCreate, app_id: str, submitted_at: datetime) -> str:
    course_name = COURSE_NAMES.get(app_payload.course, app_payload.course)
    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; background:#faf7f2; padding:24px; color:#1a1a1a;">
        <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.06);">
          <div style="background: linear-gradient(135deg, #3a0a3a, #5b0e5b, #7a1a7a); padding:28px; color:#ffffff;">
            <div style="color:#f5c518; letter-spacing:2px; font-size:11px; font-weight:600;">NEW ADMISSION APPLICATION</div>
            <h1 style="margin:8px 0 0; font-size:24px;">Humanity Care College of Higher Studies</h1>
            <p style="margin:6px 0 0; color:#e5d5e5; font-size:13px;">Application ID: {app_id}</p>
          </div>
          <div style="padding:28px;">
            <h2 style="margin:0 0 16px; color:#5b0e5b; font-size:18px;">Applicant Details</h2>
            <table style="width:100%; border-collapse: collapse; font-size:14px;">
              <tr><td style="padding:8px 0; color:#666; width:160px;">Full Name</td><td style="padding:8px 0; font-weight:600;">{app_payload.fullName}</td></tr>
              <tr><td style="padding:8px 0; color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:{app_payload.email}" style="color:#5b0e5b;">{app_payload.email}</a></td></tr>
              <tr><td style="padding:8px 0; color:#666;">Phone</td><td style="padding:8px 0;"><a href="tel:{app_payload.phone}" style="color:#5b0e5b;">{app_payload.phone}</a></td></tr>
              <tr><td style="padding:8px 0; color:#666;">Date of Birth</td><td style="padding:8px 0;">{app_payload.dob or '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#666;">Gender</td><td style="padding:8px 0;">{app_payload.gender or '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#666;">Course Interested</td><td style="padding:8px 0; font-weight:600; color:#5b0e5b;">{app_payload.course} &mdash; {course_name}</td></tr>
              <tr><td style="padding:8px 0; color:#666;">Qualification</td><td style="padding:8px 0;">{app_payload.qualification or '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#666; vertical-align:top;">Address</td><td style="padding:8px 0;">{app_payload.address or '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#666; vertical-align:top;">Message</td><td style="padding:8px 0;">{app_payload.message or '-'}</td></tr>
              <tr><td style="padding:8px 0; color:#666;">Submitted At</td><td style="padding:8px 0;">{submitted_at.strftime('%d %b %Y, %I:%M %p UTC')}</td></tr>
            </table>
            <div style="margin-top:24px; padding:14px; background:#f5c51820; border-left:4px solid #f5c518; border-radius:6px; font-size:13px;">
              Please contact the applicant within 24 working hours.
            </div>
          </div>
          <div style="background:#2a0a2a; color:#cccccc; padding:16px 28px; font-size:12px;">
            Humanity Care College of Higher Studies &middot; Muzaffarpur, Bihar
          </div>
        </div>
      </body>
    </html>
    """


def send_application_email(app_payload: ApplicationCreate, app_id: str, submitted_at: datetime) -> bool:
    if not SMTP_USER or not SMTP_PASSWORD:
        logger.warning("SMTP credentials not configured; skipping email")
        return False
    try:
        course_name = COURSE_NAMES.get(app_payload.course, app_payload.course)
        msg = EmailMessage()
        msg['Subject'] = f"New Admission Application: {app_payload.fullName} ({app_payload.course})"
        msg['From'] = f"{SMTP_FROM_NAME} <{SMTP_USER}>"
        msg['To'] = APPLICATION_RECIPIENT
        msg['Reply-To'] = app_payload.email
        plain = (
            f"New Admission Application\n\n"
            f"Application ID: {app_id}\n"
            f"Name: {app_payload.fullName}\n"
            f"Email: {app_payload.email}\n"
            f"Phone: {app_payload.phone}\n"
            f"DOB: {app_payload.dob or '-'}\n"
            f"Gender: {app_payload.gender or '-'}\n"
            f"Course: {app_payload.course} - {course_name}\n"
            f"Qualification: {app_payload.qualification or '-'}\n"
            f"Address: {app_payload.address or '-'}\n"
            f"Message: {app_payload.message or '-'}\n"
            f"Submitted: {submitted_at.isoformat()}\n"
        )
        msg.set_content(plain)
        msg.add_alternative(build_email_html(app_payload, app_id, submitted_at), subtype='html')

        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
            server.ehlo()
            server.starttls(context=context)
            server.ehlo()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        logger.info(f"Application email sent to {APPLICATION_RECIPIENT} for {app_payload.fullName}")
        return True
    except Exception as e:
        logger.exception(f"Failed to send application email: {e}")
        return False


# ============= Routes =============
@api_router.get("/")
async def root():
    return {"message": "Humanity Care College API"}


@api_router.get("/health")
async def health():
    smtp_ready = bool(SMTP_USER and SMTP_PASSWORD)
    return {"status": "ok", "smtp_configured": smtp_ready}


@api_router.post("/applications")
async def submit_application(payload: ApplicationCreate, background_tasks: BackgroundTasks):
    app_id = str(uuid.uuid4())
    submitted_at = datetime.utcnow()

    if not SMTP_USER or not SMTP_PASSWORD:
        # Without DB and without email, we cannot record this application anywhere.
        logger.error("Cannot accept application: SMTP not configured")
        raise HTTPException(
            status_code=503,
            detail="Email service is not configured. Please call us directly.",
        )

    # Fire-and-forget email so the user gets an instant response.
    background_tasks.add_task(send_application_email, payload, app_id, submitted_at)

    return {
        "success": True,
        "id": app_id,
        "message": "Application submitted successfully. Our admissions team will contact you shortly.",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
