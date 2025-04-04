import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_health_response(message: str, language: str = "english") -> str:
    system_instruction = f"""
    You are a highly intelligent and kind health assistant.
    Your job is to only answer health-related queries.
    You must not answer questions unrelated to health.
    You must respond in {language}.
    """

    model = genai.GenerativeModel("gemini - 2.0 - flash")
    chat = model.start_chat(history=[])

    response = chat.send_message(system_instruction + "\n" + message)
    return response.text.strip()