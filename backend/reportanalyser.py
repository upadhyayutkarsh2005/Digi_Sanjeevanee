import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from pymongo import MongoClient
from datetime import datetime
import google.generativeai as genai
import fitz  # PyMuPDF for PDF text extraction
from dotenv import load_dotenv
from PIL import Image
import io

load_dotenv()

# Initialize Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set in environment variables")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

# MongoDB setup
client = MongoClient(os.getenv("MongoDB_URI"))
db = client.digi_sanjeevani
report_collection = db["medical_reports"]

router = APIRouter()

PROMPT_TEMPLATE = (
    "You are an AI-powered medical report summarizer. Given a raw medical report text, generate a well-structured, "
    "clear, and human-readable summary. Focus on key medical details such as patient information, referring doctor, "
    "tests performed, findings, diagnosis, and recommendations. Present the information in a natural flow, avoiding bullet points "
    "and unnecessary formatting. Ensure accuracy and coherence. Here is the medical report:\n\n{report_text}"
)

@router.post("/analyze-report")
async def analyze_report(file: UploadFile = File(...)):
    if not (file.filename.endswith(".txt") or file.filename.endswith((".png", ".jpg", ".jpeg", ".pdf"))):
        raise HTTPException(status_code=400, detail="Only .txt, .pdf, and image files (.png, .jpg, .jpeg) are supported")

    content = await file.read()
    
    if file.filename.endswith(".txt"):
        report_text = content.decode("utf-8")
    elif file.filename.endswith(".pdf"):
        report_text = extract_text_from_pdf(content)
    else:
        report_text = extract_text_from_image(content)

    if not report_text.strip():
        raise HTTPException(status_code=400, detail="No text found in the uploaded file")

    prompt = PROMPT_TEMPLATE.format(report_text=report_text)

    try:
        response = model.generate_content(prompt)
        insights = response.text.strip()

        report_entry = {
            "filename": file.filename,
            "upload_time": datetime.utcnow(),
            "report_text": report_text,
            "insights": insights,
        }
        report_collection.insert_one(report_entry)

        return {
            "filename": file.filename,
            "insights": insights
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


def extract_text_from_pdf(content: bytes) -> str:
    """Extracts text from a PDF file using PyMuPDF (pymupdf)."""
    try:
        doc = fitz.open(stream=content, filetype="pdf")
        text = "\n".join([page.get_text() for page in doc])
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF processing failed: {str(e)}")


def extract_text_from_image(content: bytes) -> str:
    """Extracts text from an image using Google Vision OCR alternative."""
    try:
        from easyocr import Reader  # Using EasyOCR as an alternative to Tesseract
        reader = Reader(['en'])
        image = Image.open(io.BytesIO(content))
        results = reader.readtext(image)
        extracted_text = " ".join([result[1] for result in results])
        return extracted_text.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")