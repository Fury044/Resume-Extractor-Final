from fastapi import FastAPI
from .routes.api import router
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title=os.getenv("APP_NAME", "FastAPI Backend"),
    version=os.getenv("API_VERSION", "v1")
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://resumeextractor0.netlify.app",  # Front End ko link krne ke liye (Important)
        "http://localhost:3000",              # Local host testing krne ke liye
        "http://localhost:5173",              # For Vite development server
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router, prefix="/api")

@app.get("/")
def read_root():
    return {
        "message": "Hello World from FastAPI!",
        "app_name": os.getenv("APP_NAME", "FastAPI Backend"),
        "version": os.getenv("API_VERSION", "v1")
    } 