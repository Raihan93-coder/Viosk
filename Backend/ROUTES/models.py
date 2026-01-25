from pydantic import BaseModel
from fastapi import FastAPI

class complaint(BaseModel):
    consumer_service: str
    consumer_phone: str
    consumer_description: str
    
