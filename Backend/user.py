from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from models import complaint
from DB.conn import conn, cursor

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
    query="INSERT INTO consumercomplaint (consumer_service, consumer_phone, consumer_description) VALUES (%s, %s, %s)"
    cursor.execute(query, (data.consumer_service, data.consumer_phone, data.consumer_description))  
    conn.commit()
    return {"status": "success", "message": "Complaint submitted successfully"}
