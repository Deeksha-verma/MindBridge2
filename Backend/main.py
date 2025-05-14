from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import numpy as np
import cv2
from deepface import DeepFace
from textblob import TextBlob
from PIL import Image
import io

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "OK"}

@app.post("/detect-emotion")
async def detect_emotion(request: Request):
    print("Received request")
    data = await request.json()
    image_data = data['image'].split(',')[1]  # Remove data:image/jpeg;base64 prefix
    image_bytes = base64.b64decode(image_data)
    np_array = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    try:
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        emotion = result[0]['dominant_emotion'] if isinstance(result, list) else result['dominant_emotion']
        return {"emotion": emotion}
    except Exception as e:
        return {"error": str(e)}

@app.post("/analyze-sentiment")
async def analyze_sentiment(request: Request):
    data = await request.json()
    text = data.get("text", "")
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity

    if polarity > 0:
        mood = "Happy"
    elif polarity < 0:
        mood = "Sad"
    else:
        mood = "Neutral"

    return {"mood": mood}

# New route using DeepFace instead of FER
class FrameInput(BaseModel):
    image: str
    userId: str

@app.post("/sentiment-frame")
async def analyze_frame_with_deepface(frame: FrameInput):
    try:
        img_bytes = base64.b64decode(frame.image.split(",")[1])
        np_array = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(np_array, cv2.IMREAD_COLOR)
        result = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)
        emotion = result[0]['dominant_emotion'] if isinstance(result, list) else result['dominant_emotion']
        return {"emotion": emotion}
    except Exception as e:
        return {"error": str(e)}
