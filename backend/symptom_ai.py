import os
import re
import json
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("Gemini API Key is missing! Please set it in the .env file.")

genai.configure(api_key=GEMINI_API_KEY)

def analyze_symptoms_with_ai(symptoms: list[str]) -> dict:
    model = genai.GenerativeModel("gemini-2.0-flash")

    prompt = f"""
    Based on these symptoms: {', '.join(symptoms)}, provide a JSON object containing:
    {{
      "possibleConditions": [
        {{ "name": "Condition Name", "probability": probability_in_percent (0-100) }}
      ],
      "recommendations": [
        "Recommendation 1",
        "Recommendation 2"
      ],
      "severity": "Low" or "Moderate" or "High"
    }}
    Only return valid JSON. Do not include markdown or code blocks. No ```json or ``` at all.
    """

    response = model.generate_content(prompt)
    response_text = response.text.strip()

    # ✅ Strip triple backticks using regex
    response_text = re.sub(r"^```json|```$", "", response_text).strip("` \n")

    print("Cleaned Gemini Response:", response_text)

    if not response_text:
        raise ValueError("Gemini returned an empty response!")

    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse Gemini response:\n{response_text}\nError: {str(e)}")