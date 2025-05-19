from fastapi import APIRouter
from .skills import router as skills_router

router = APIRouter()

# Include the skills router
router.include_router(skills_router, prefix="/skills", tags=["skills"]) 