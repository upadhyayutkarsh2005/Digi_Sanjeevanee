from fastapi import FastAPI, UploadFile, File, Query, HTTPException
import fitz  # PyMuPDF
import google.generativeai as genai
import io
import json
from PIL import Image
import pytesseract
from pydantic import BaseModel
from hospital_locator import get_nearby_hospitals, get_coordinates
from doctor_consultation import router as doctor_router
from medicine_recommendation import router as medicine_router
from auth import auth_router
from mongodb import database
from reportanalyser import router as report_analyzer_router
from symptom_ai import analyze_symptoms_with_ai
from fastapi.middleware.cors import CORSMiddleware
from chatbot import get_health_response

# Initialize FastAPI
app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

# ✅ Configure Gemini API (Ensure API Key is Set)
GEMINI_API_KEY = "AIzaSyDpFnORLdDnFAve0scxf9Aj2QnWL-QCevA"
if not GEMINI_API_KEY:
    raise ValueError("Gemini API key is missing! Set your API key before running the app.")

genai.configure(api_key=GEMINI_API_KEY)

@app.on_event("startup")
async def startup_db():
    await database.connect()

@app.on_event("shutdown")
async def shutdown_db():
    await database.close()

# Include authentication routes
app.include_router(auth_router, prefix="/auth")

@app.get("/")
async def root():
    return {"message": "Welcome to Digi_Sanjeevani API"}

# ✅ Extract text from PDF
def extract_text_from_pdf(pdf_bytes):
    text = ""
    pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
    for page in pdf_document:
        text += page.get_text()
    return text

# ✅ Extract text from Image (OCR)
def extract_text_from_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    text = pytesseract.image_to_string(image)
    return text

# ✅ Send extracted text to Gemini AI for structuring
def get_structured_data(extracted_text):
    prompt = f"""
    Extract and structure the following medical report into a JSON format:
    {json.dumps({
        "patient_details": {
            "name": "John Doe",
            "age": 30,
            "gender": "Male"
        },
        "test_results": [
            {
                "test_name": "Test Name",
                "observed_value": "Value",
                "unit": "Unit",
                "reference_interval": "Reference Range"
            }
        ],
        "additional_notes": "Any additional information"
    }, indent=2)}

    Ensure the response follows this exact JSON structure.
    """
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(prompt)

    if not response or not response.candidates:
        return {"error": "No valid response from Gemini AI"}

    try:
        return json.loads(response.candidates[0].text)
    except json.JSONDecodeError:
        return {"error": "Failed to parse AI response. Ensure Gemini returns valid JSON."}

# ✅ API Endpoint to Upload and Analyze Medical Report
@app.post("/analyze/report")
async def analyze_report(file: UploadFile = File(...)):
    file_bytes = await file.read()

    if file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file_bytes)
    elif file.filename.endswith((".png", ".jpg", ".jpeg")):
        extracted_text = extract_text_from_image(file_bytes)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a PDF or image.")

    structured_data = get_structured_data(extracted_text)
    return {"filename": file.filename, "structured_report": structured_data}

# ✅ Symptom-based AI Prediction
class SymptomInput(BaseModel):
    symptoms: list[str]

@app.post("/analyze-symptoms/")
async def analyze_symptoms(data: SymptomInput):
    try:
        result = analyze_symptoms_with_ai(data.symptoms)
        return result
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Find Nearest Hospitals
@app.get("/nearest-hospitals")
async def nearest_hospitals(address: str, radius: int = Query(5000, description="Search radius in meters")):
    lat, lon = get_coordinates(address)
    if lat is None or lon is None:
        raise HTTPException(status_code=400, detail="Invalid address or location not found")

    hospitals = get_nearby_hospitals(lat, lon, radius)
    return {"address": address, "latitude": lat, "longitude": lon, "hospitals": hospitals}

# ✅ Include Additional Routes
app.include_router(doctor_router, prefix="/api", tags=["Doctor Consultation"])
app.include_router(medicine_router, prefix="/medicine", tags=["Medicine Recommendation"])
app.include_router(report_analyzer_router, prefix="/report")

# ✅ Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    language: str  # "english" or "hindi"

@app.post("/chatbot/")
async def chatbot_response(data: ChatRequest):
    try:
        reply = get_health_response(data.message, data.language)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Run FastAPI app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
