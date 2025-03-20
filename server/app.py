from openai import OpenAI
from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import os


# --------------------------------------------------------------
#  Initialize FastAPI and OpenAI client
# --------------------------------------------------------------
load_dotenv()
app = FastAPI()

client = OpenAI(
    """
     This is a comment btw, DEEPSEEK_SECRET is the API key 
     for the deepseek API
    """,
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["DEEPSEEK_SECRET"],
)

# --------------------------------------------------------------
#  Prompt engineering
# --------------------------------------------------------------
# instruction = "You generate a lesson contents for "

completion = client.chat.completions.create(
    model="deepseek/deepseek-r1:free",
    messages=[
        {"role": "user", "content": "What is the meaning of life?"}
    ],
)

@app.post('/api/generate-roadmap')
def Roadmap():
    return {"message": "Hello World"}



print(completion.choices[0].message.content)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
