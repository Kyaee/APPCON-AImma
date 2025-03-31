from openai import OpenAI
from fastapi import FastAPI
# from dotenv import load_dotenv
from pydantic import BaseModel
import uvicorn
import json
# import os

client = OpenAI(
    api_key='AIzaSyBi57LIg2UFpQrwpHdaAcsVkrlGJrzzNz8',
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)

app = FastAPI()

class Lesson(BaseModel):
    lesson_name: str
    category: str
    difficulty: str
    duration: int

class GenerateRoadmap(BaseModel):
    roadmap_name: str
    lessons: list[Lesson]

@app.post('/api/generate-roadmap')
async def generate_questions():
    # Prepare the prompt for question generation
    questions_prompt = """Generate 5 assessment questions for the following lesson:

    Lesson Name: What is the Event-Loop in Javascript
    Lesson Content: ## JavaScript Short Lesson: Variables & Data Types

    Response Format:
    {
        "lesson_name": "...",
        "category": "...",
        "questions": [
            {
                "text": "Question text",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correct_answer": "Correct option",
                "difficulty_level": "Easy/Medium/Hard",
                "explanation": "Explanation of the correct answer"
                "explanation": "Incase of wrong answer"
            },
            ...
        ]
    }
    """
    response = client.chat.completions.create(
        model="gemini-2.0-flash",
        messages=[
            {"role": "system", "content": "You are an expert educational content creator specializing in assessment design."},
            {"role": "user", "content": questions_prompt}
            ],
        )


    event = response.choices[0].message.content
    return { questions_prompt: event }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
