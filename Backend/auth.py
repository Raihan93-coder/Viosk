# Functions used in this module: OAuth2 login (Modern)
# Ready for JWT cookies later

import requests
import urllib.parse
import env

from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.responses import RedirectResponse

# ---------------- CONFIG ---------------- #

CLIENT_ID = env.CLIENT_ID
CLIENT_SECRET = env.CLIENT_SECRET
REDIRECT_URI = env.REDIRECT_URI

AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
TOKEN_URL = "https://oauth2.googleapis.com/token"
USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

ALLOWED_EMAIL = {
    "cs24b1096@iiitdm.ac.in",
    "cs24i1023@iiitdm.ac.in",
    "cs24b1003@iiitdm.ac.in",
    "cs24i1009@iiitdm.ac.in",
}

# ---------------- APP ---------------- #

auth_router = APIRouter()

# ---------------- UTILS ---------------- #

def is_user_allowed(email: str) -> bool:
    return email in ALLOWED_EMAIL

# ---------------- ROUTES ---------------- #

@auth_router.get("/login")
def login():
    params = {
        "response_type": "code",
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "consent",
    }

    url = AUTH_URL + "?" + urllib.parse.urlencode(params)
    return RedirectResponse(url)


@auth_router.get("/callback")
def callback(code: str):
    access_token = exchange_code_for_token(code)
    email = fetch_user_email(access_token)

    if not is_user_allowed(email):
        raise HTTPException(status_code=403, detail="Access denied")

    return {
        "status": "success",
        "email": email,
        "message": "Access granted",
    }

# ---------------- OAUTH HELPERS ---------------- #

def exchange_code_for_token(code: str) -> str:
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    response = requests.post(TOKEN_URL, data=data)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Token exchange failed")

    return response.json()["access_token"]


def fetch_user_email(access_token: str) -> str:
    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(USERINFO_URL, headers=headers)

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Failed to fetch user info")

    return response.json()["email"]
