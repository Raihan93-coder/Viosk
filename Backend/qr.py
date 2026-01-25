import qrcode
import io
import uuid
import socket
import base64
from fastapi import APIRouter
from DB.conn import conn, cursor

qr_router = APIRouter()

# Simple in-memory session store (could use DB instead)
photo_sessions = {}

def get_local_ip():
    """Get local IP address."""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0)
        s.connect(('8.8.8.8', 1))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return '127.0.0.1'

@qr_router.post("/init_session")
def init_session():
    """Create a new photo upload session and return QR code."""
    session_id = str(uuid.uuid4())
    photo_sessions[session_id] = {"status": "PENDING", "photo_path": None}
    
    # Build upload URL using local IP
    local_ip = get_local_ip()
    upload_url = f"http://{local_ip}:8000/upload/{session_id}"
    
    # Generate QR code
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(upload_url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    qr_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')
    
    return {
        "session_id": session_id,
        "qr_code": f"data:image/png;base64,{qr_base64}",
        "upload_url": upload_url
    }

@qr_router.get("/status/{session_id}")
def get_session_status(session_id: str):
    """Check the status of a photo upload session."""
    session = photo_sessions.get(session_id)
    if not session:
        return {"status": "NOT_FOUND"}
    return session
