![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# CapyCademy

A brief description of what this project does and who it's for

insert gif or link here

## 🧰 Tech Stack

| Client | Tools |
| ------ | ----- |
| Frameworks   | React, ShadCN, Tailwind CSS |
| State & Data | Zustand, TanStack Query     |
| Tools & API  | Axios, and Supabase         |

| Server | Tools |
| ------ | ----- |
| Languages & Frameworks   | Python, FastAPI |
| AI Integrations | OpenAI package, Deepseek, and Gemini Services     |

## ⚙️ Getting Started
**1. Go to the server directory**

```
cd server
```

**2. Create and activate a virtual environment**

```
python -m venv .venv
source .venv/Scripts/activate  # Windows
```

## or

```
source .venv/bin/activate  # macOS/Linux
```

**3. Install dependencies**

```
pip install -r requirements.txt
```

**4. Start the server**

```
uvicorn app:app --reload
```

## 🔐 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

**CLIENT**:

- VITE_SUPABASE_KEY = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndteHVnY3Fqa3Jkcmh3YXZseGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5Mzc0NDYsImV4cCI6MjA1NzUxMzQ0Nn0.ut6C9mnpXg9rZxt2yvmB3PWZ_em-IL3SD-roe0lmPcY`
- VITE_SUPABASE_URL = `https://wmxugcqjkrdrhwavlxje.supabase.co`

**SERVER**:

- DEEPSEEK_API_KEY = `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`
- DEEPSEEK_URL = `https://openrouter.ai/api/v1`
- GEMINI_API_KEY = `GEMINI_API_KEY=AIzaSyBi57LIg2UFpQrwpHdaAcsVkrlGJrzzNz8`
- GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/openai/`

CLIENT
1. cd client
2. npm i
3. npm run dev

AI SERVER
1. cd server
2. python -m venv .venv
3. ./.venv/Scripts/Activate 
4. pip install -r requirements
5. uvicorn app:app --reload



## Authors

- [Emmanuel Fabella](https://github.com/MasterTraits)
- [Joselito Ayon](https://github.com/Junjuyun)
- [Romer Bernabe](https://github.com/FGHTGH)
- [Jin Anthony Pradas](https://github.com/salierii1)
- [Charls Jensen Abad](https://github.com/rafnamourcesca)
- [Emmanuel Espiritu](https://github.com/EmmesSpirit02)
- [Diana Torres]()
- [Catherine Notado]()
- [Jogiofernesto Ardales]()


## Feedback

If you have any feedback, please reach out to us emmanuelfabella606@gmail.com or notadocath@gmail.com

## Deployment

To deploy this project run

```bash
  npm run deploy
```
