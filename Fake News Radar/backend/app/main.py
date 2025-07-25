from fastapi import FastAPI, HTTPException, Request, Form, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl
from typing import Optional, List, Dict, Any, Union
import uvicorn
import os
import json
import requests
from bs4 import BeautifulSoup
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import numpy as np

# Import model handler
from model.model_handler import FakeNewsDetector

# Create FastAPI app
app = FastAPI(
    title="Fake News Radar API",
    description="API for detecting fake news using ML models",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
model_detector = FakeNewsDetector()

# Request models
class NewsContent(BaseModel):
    content: str
    
class NewsUrl(BaseModel):
    url: HttpUrl

# Response models
class SourceMetadata(BaseModel):
    published_date: Optional[str] = None
    author: Optional[str] = None
    source: Optional[str] = None

class CredibilityScore(BaseModel):
    score: float  # 0 to 1, where 1 is most credible
    category: str  # "Credible", "Somewhat Credible", "Not Credible"
    highlighted_segments: List[Dict[str, Any]]  # Segments with issues
    url: Optional[str] = None  # Original URL if analysis was done on a URL
    title: Optional[str] = None  # Article title if extracted from URL
    source_metadata: Optional[SourceMetadata] = None  # Metadata about the source

@app.get("/")
async def read_root():
    return {"message": "Welcome to Fake News Radar API"}

@app.post("/analyze/content", response_model=CredibilityScore)
async def analyze_content(news: NewsContent):
    try:
        # Process the content through our model
        result = model_detector.analyze_text(news.content)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze/url", response_model=CredibilityScore)
async def analyze_url(news: NewsUrl):
    try:
        # Use the model's URL analyzer which handles extraction and analysis
        result = model_detector.analyze_url(str(news.url))
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Server error: {str(e)}")


@app.get("/model/info")
async def model_info():
    return {
        "model_name": model_detector.model_name,
        "model_version": model_detector.model_version,
        "last_updated": model_detector.last_updated
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)