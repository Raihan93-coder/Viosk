from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from user import user_router
from auth import auth_router
from qr import qr_router
#from cookies import cookie_router

app = FastAPI(title="Kiosk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#include_routers
app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/user")
app.include_router(qr_router, prefix="/qr")
#app.include_router(cookie_router, prefix="/cookie")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Kiosk API(backend)🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
