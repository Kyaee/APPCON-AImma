from pydantic import BaseModel

"""============================
  STEP 1: Generate Roadmap
============================"""
class Lesson(BaseModel):
    lesson_name: str
    category: str
    difficulty: str
    duration: int

class GenerateRoadmap(BaseModel):
    roadmap_name: str
    description: str
    lessons: list[Lesson]

class RoadmapRequest(BaseModel):
    prompt_roadmap_generate: str

"""==================================================
  STEP 2: Generate lesson content based on roadmap
==================================================="""
class GenerateLesson(BaseModel):
    prompt_lesson_generate: str
    lesson_id: int
    lesson_name: str
    category: list[str]
    difficulty: str
    gems: int
    exp: int
    duration: str
    assessment: bool

"""======================================
  STEP 3: Generate questions from lesson
=========================================="""
class Question(BaseModel):
    question_type: str
    text: str
    options: list[str]
    correct_answer: str
    explanation: str

class GenerateQuestions(BaseModel):
    questions: list[Question]

class QuestionRequest(BaseModel):
    prompt_assessment_generate: str
    id: int
    name: str

"""======================================
  STEP 4: Assessment request model
=========================================="""
class AssessmentRequest(BaseModel):
    prompt_summary_generate: str
    lesson_id: int
    lesson_name: str
    difficulty_level: str
    
class GenerateSummary(BaseModel):
    summary: str
    linechart: list[int]
    radarchart: list[int]

