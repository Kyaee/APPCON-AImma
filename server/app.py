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

roadmap_content = {}
lesson_content = {}
assessment_content = {}
summary_content = {}


@app.post("/api/generate-roadmap")
def POST_generate_roadmap(request: RoadmapRequest = None):
    global roadmap_content
    if request:
        Roadmap_completion = client.beta.chat.completions.parse(
            # model="deepseek/deepseek-r1:free",
            model="gemini-2.0-flash",
            messages=[
                # {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.prompt_roadmap_generate}
            ],
            response_format=GenerateRoadmap,
        )

        event = Roadmap_completion.choices[0].message.parsed
        roadmap_content = {
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
def POST_generate_lesson(
    request: GenerateLesson = None,
):
    print(f"DEBUG: Received request_data: {request}")
    print(f"DEBUG: Type of data: {type(request)}")
    global lesson_content
    if request:
        Lesson_completion = client.chat.completions.create(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request.prompt_lesson_generate}],
        )
        content = Lesson_completion.choices[0].message.content
        lesson_content = {
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
    global assessment_content
    if request:
        Assessment_completion = client.beta.chat.completions.parse(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request.prompt_assessment_generate}],
            response_format=GenerateQuestions,
        )
        content = Assessment_completion.choices[0].message.parsed
        assessment_content = {
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
    global summary_content
    if request: 
        summary_completion = client.beta.chat.completions.parse(
            model="gemini-2.0-flash",
            messages=[{"role": "user", "content": request}],
            response_format=GenerateSummary,
        )
        content = summary_completion.choices[0].message.parsed
        summary_content = {
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
    if roadmap_content:
        return [roadmap_content]
    else:
        return {"No roadmap generated yet"}


@app.get("/api/get-lesson")
def GET_generate_lesson():
    if lesson_content:
        return lesson_content
    else:
        return {"message": "No lesson generated yet"}

@app.get("/api/get-assessment")
def GET_generate_assessment():
    if assessment_content:
        return assessment_content
    else:
        return {"message": "No assessment generated yet"}   

# --------------------------------------------------------------
#  Prompt engineering
# --------------------------------------------------------------
# instruction = "You generate a lesson contents for "

# completion = client.chat.completions.create(
#     model="deepseek/deepseek-r1:free",
#     messages=[
#         {"role": "user", "content": "What is the meaning of life?"}
#     ],
# )

# @app.post('/api/generate-roadmap')
# def Roadmap():
#     return {"message": "Hello World"}


# print(completion.choices[0].message.content)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
