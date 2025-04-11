from openai import OpenAI
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from classformats import (
    RoadmapRequest, GenerateRoadmap,
    QuestionRequest, GenerateLesson,
    GenerateQuestions, AssessmentRequest,
    GenerateSummary,   
)
from pydantic import BaseModel
import json

# --------------------------------------------------------------
#  Initialize FastAPI, supabase and OpenAI client
# --------------------------------------------------------------
load_dotenv()

app = FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

client = OpenAI(
    api_key=os.environ["GEMINI_API_KEY"],
    base_url=os.environ["GEMINI_URL"],
)

# --------------------------------------------------------------
#  SYSTEM PROMPT
#  This is the system prompt that defines the role of the AI
# --------------------------------------------------------------

system_prompt = (
    "Your role is to generate technical training content:\n"
    "1. Create learning roadmaps for professionals.\n"
    "2. Develop lesson content in markdown format.\n"
    "3. Generate multiple-choice assessment questions.\n"
    "4. Tailor content to difficulty levels (Easy/Intermediate/Hard).\n"
    "5. Focus on technical subjects like JavaScript with examples.\n"
    "6. Design content for 30-minute daily learning goals."
)

# Replace global variables with a dictionary
data_store = {
    "roadmap": None,
    "lesson": None,
    "assessment": None,
    "summary": None,
}

@app.post("/api/generate-roadmap")
def POST_generate_roadmap(request: RoadmapRequest = None):
    if request:
        Roadmap_completion = client.beta.chat.completions.parse(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request.prompt_roadmap_generate}],
            response_format=GenerateRoadmap,
        )
        event = Roadmap_completion.choices[0].message.parsed
        data_store["roadmap"] = {
            "roadmap_name": event.roadmap_name,
            "description": event.description,
            "lessons": [
                {
                    "lesson_name": lesson.lesson_name,
                    "category": lesson.category,
                    "difficulty": lesson.difficulty,
                    "duration": lesson.duration,
                }
                for lesson in event.lessons
            ],
        }
    else:
        return {"message": "data was not posted"}


@app.post("/api/generate-lesson")
def POST_generate_lesson(request: GenerateLesson = None):
    if request:
        Lesson_completion = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request.prompt_lesson_generate}],
        )
        content = Lesson_completion.choices[0].message.content
        data_store["lesson"] = {
            "lesson": content,
            "id": request.lesson_id,
            "name": request.lesson_name,
            "category": request.category,
            "difficulty": request.difficulty,
            "gems": request.gems,
            "exp": request.exp,
            "duration": request.duration,
            "assessment": request.assessment,
        }
    else:
        return {"message": "data was not posted"}


@app.post("/api/generate-assessment")
def POST_generate_assessment(request: QuestionRequest = None):
    if request:
        Assessment_completion = client.beta.chat.completions.parse(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request.prompt_assessment_generate}],
            response_format=GenerateQuestions,
        )
        content = Assessment_completion.choices[0].message.parsed
        data_store["assessment"] = {
            "id": request.id,
            "name": request.name,
            "questions": [
                {
                    "question_type": question.question_type,
                    "text": question.text,
                    "options": question.options,
                    "correct_answer": question.correct_answer,
                    "explanation": question.explanation,
                }
                for question in content.questions
            ],
        }
    else:
        return {"message": "data was not posted"}


@app.post('/api/generate-summary') 
def POST_generate_summary(request: AssessmentRequest = None):
    if request: 
        summary_completion = client.beta.chat.completions.parse(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request}],
            response_format=GenerateSummary,
        )
        content = summary_completion.choices[0].message.parsed
        data_store["summary"] = {
            "id": request.lesson_id,
            "lesson_name": request.lesson_name,
            "difficulty_level": request.difficulty_level,
            "summary": content.summary,
            "linechart": content.linechart,
            "radarchart": content.radarchart,
        }
    else:
        return {"message": "data was not posted"}


@app.get("/api/get-roadmap")
def GET_generate_roadmap():
    if data_store["roadmap"]:
        return [data_store["roadmap"]]
    else:
        return {"message": "No roadmap generated yet"}


@app.get("/api/get-lesson")
def GET_generate_lesson():
    if data_store["lesson"]:
        return data_store["lesson"]
    else:
        return {"message": "No lesson generated yet"}


@app.get("/api/get-assessment")
def GET_generate_assessment():
    if data_store["assessment"]:
        return data_store["assessment"]
    else:
        return {"message": "No assessment generated yet"}


@app.get("/api/get-summary")
def GET_generate_summary():
    if data_store["summary"]:
        return data_store["summary"]
    else:
        return {"message": "No summary generated yet"}   

# --------------------------------------------------------------
#  Prompt engineering
# --------------------------------------------------------------


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
