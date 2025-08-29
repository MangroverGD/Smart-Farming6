from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from crop_router import router as crop_router
from disease_router import router as disease_router
from mainy import router as yield_router
from mainr import router as mainr

app = FastAPI(version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include both routers with appropriate prefixes
app.include_router(crop_router, prefix="/predict", tags=["crop"])
app.include_router(disease_router, prefix="/predict", tags=["disease"])
app.include_router(yield_router, prefix="/predict", tags=["yield"])
app.include_router(mainr, prefix="/rag", tags=["mainr"])

@app.get("/")
def home():
    return {"message": "Welcome to Agriculture Prediction API"}