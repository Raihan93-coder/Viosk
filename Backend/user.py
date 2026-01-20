from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from models import complaint

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/quickpay")
def quick_pay():
    return {"url": "https://wss.kseb.in/selfservices/quickpay"}

@app.post("/consumercomplaint")
def consumer_complaint(data:complaint):
    if(len(complaint.consumer_description))<5:
        raise HTTPException(status_code=400, detail="Description must be at least 5 words")
    