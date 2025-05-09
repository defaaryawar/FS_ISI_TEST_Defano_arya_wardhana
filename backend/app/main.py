from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, routes
from .database import engine

# Create tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Task Management API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, specify the actual frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the API routes
app.include_router(routes.router)


@app.get("/")
def read_root():
    """Root endpoint for health check"""
    return {"status": "OK", "message": "Task Management API is running"}