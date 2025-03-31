from openai import OpenAI
from fastapi import FastAPI
from dotenv import load_dotenv
from pydantic import BaseModel
import uvicorn
import os

# --------------------------------------------------------------
#  Initialize FastAPI and OpenAI client
# --------------------------------------------------------------
load_dotenv()
app = FastAPI()

# client = OpenAI(
#     """
#      This is a comment btw, DEEPSEEK_SECRET is the API key 
#      for the deepseek API
#     """,p
#     base_url="https://openrouter.ai/api/v1",
#     api_key=os.environ["DEEPSEEK_SECRET"],
# )

client = OpenAI(
    api_key='AIzaSyBi57LIg2UFpQrwpHdaAcsVkrlGJrzzNz8',
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
)



class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

completion = client.beta.chat.completions.parse(
    model="gemini-2.0-flash",
    messages=[
        {"role": "system", "content": "Extract the event information."},
        {"role": "user", "content": "John and Susan are going to an AI conference on Friday."},
    ],
    response_format=CalendarEvent,
)

event = completion.choices[0].message.parsed
print(event.name)

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

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8000)
