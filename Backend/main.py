from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from ROUTES.user import user_router
from ROUTES.auth import auth_router
from ROUTES.qr import qr_router
from upload import upload_router
#from ROUTES.cookies import cookie_router

app = FastAPI(title="Kiosk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for local network access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth")
app.include_router(user_router, prefix="/user")
app.include_router(qr_router, prefix="/qr")
app.include_router(upload_router, prefix="/upload")

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

#app.include_router(cookie_router, prefix="/cookie")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Kiosk API(backend)🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
