from fastapi import APIRouter, File, UploadFile
from fastapi.responses import HTMLResponse
import shutil
import os

# Import the shared session store from qr.py
from qr import photo_sessions

upload_router = APIRouter()

# Create uploads directory
UPLOAD_DIR = "static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@upload_router.get("/{session_id}", response_class=HTMLResponse)
def upload_page(session_id: str):
    """Serve a simple HTML upload form."""
    session = photo_sessions.get(session_id)
    
    if not session:
        return HTMLResponse("<h1>Invalid Session</h1>", status_code=404)
    
    if session["status"] == "COMPLETED":
        return HTMLResponse("<h1 style='color:green;text-align:center;margin-top:50px;'>Photo already uploaded!</h1>")
    
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Upload Photo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {{ font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0f2f5; padding: 20px; box-sizing: border-box; }}
            .container {{ background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; width: 100%; max-width: 400px; }}
            h2 {{ color: #333; margin-bottom: 1.5rem; }}
            input[type="file"] {{ margin: 20px 0; width: 100%; }}
            button {{ background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; width: 100%; }}
            button:active {{ background: #1d4ed8; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h2>📷 Upload Photo</h2>
            <form action="/upload/{session_id}" method="post" enctype="multipart/form-data">
                <input type="file" name="file" accept="image/*" capture="environment" required>
                <button type="submit">Upload</button>
            </form>
        </div>
    </body>
    </html>
    """

@upload_router.post("/{session_id}", response_class=HTMLResponse)
def handle_upload(session_id: str, file: UploadFile = File(...)):
    """Handle file upload."""
    session = photo_sessions.get(session_id)
    
    if not session:
        return HTMLResponse("<h1>Invalid Session</h1>", status_code=404)
    
    try:
        # Save file
        extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
        filename = f"{session_id}.{extension}"
        filepath = os.path.join(UPLOAD_DIR, filename)
        
        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Update session
        photo_sessions[session_id] = {
            "status": "COMPLETED",
            "photo_path": filepath
        }
        
        return HTMLResponse("""
            <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                <h1 style="color: #22c55e;">✓ Upload Successful!</h1>
                <p style="color: #666;">You can close this page now.</p>
            </div>
        """)
    except Exception as e:
        return HTMLResponse(f"<h1>Upload Failed: {str(e)}</h1>", status_code=500)
