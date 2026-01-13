from fastapi import FastAPI
import json

app = FastAPI()

@app.get("/")
def home():
    return "Home Page"

@app.post("/")
def selectLanguage(data):
    languages = ["English","Malayalam","Hindi"]
    data = json.loads(data)
    language = data["lang"]
    for lang in languages:
        if language == lang:
            #Continue after language function is set
            return 0


