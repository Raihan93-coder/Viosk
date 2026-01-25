import PyJWT as jwt
from datetime import datetime, timedelta
import env
from fastapi import APIRouter
SECRET_KEY = env.SECRET_KEY
ALGORITHM = "HS256"

cookie_router = APIRouter()

@cookie_router.get("/generate_session_cookie")
def generate_session_cookie(user_id):
    """
    Generates a session cookie based on user ID and current time.
    The cookie is configured to expire when the browser session ends.
    """
    payload = {
        "user_id": user_id,
        "iat": datetime.utcnow()
    }
    
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    
    # Omitting 'expires' and 'max_age' ensures it is a session-only cookie
    return {
        "key": "session_token",
        "value": token
    }

@cookie_router.get("/verify_session_cookie")
def verify_session_cookie(cookie_value):
    try:
        payload = jwt.decode(cookie_value, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return None

