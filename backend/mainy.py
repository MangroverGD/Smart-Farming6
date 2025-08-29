from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Annotated
import pandas as pd
import pickle
import os


try:
    with open("modely(1).pkl", "rb") as f:
        model = pickle.load(f)
except FileNotFoundError:
    model = None


app= FastAPI(version="1.0")

class YeildInput(BaseModel):
    rainfall_mm: Annotated[float, Field(..., description="rainfall in mm")]
    soil_quality_index: Annotated[float,Field(..., description="soil quality index")]   
    farm_size_hectares: Annotated[float,Field(...,description="farm size in hactare")] 
    sunlight_hours: Annotated[float, Field(...,description="sunlight in one hour")]
    fertilizer_kg: Annotated[float, Field(...,description="fertilizer in kg")]

@app.post("/predict")
def predict(data: YeildInput ):
    if model is None:
        raise HTTPException(status_code=500,detail="Model not loaded")
    try:
        input_df=pd.DataFrame([data.dict()])
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invailed input:{str(e)}")
    try:
        prediction = model.predict(input_df)[0]

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"prediction failed:{str(e)}")

    return {"prediction_crop": str(prediction)}    