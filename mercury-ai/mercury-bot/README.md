This folder contains the fastapi endpoint for the fine-tuned model for Mercury AI.

Install all requirements by running the following line in command line:
pip install -r requirements.txt

Gemini API key is loaded to environment in 'api_key.env'. Do NOT share the key with anyone.
The name of the tuned model is associated with the API Key.

First, run main.py. Then to get the endpoint running ->
Run 'main.py' by running the following command in terminal:
uvicorn main:app --reload

Response code 200 implies OK.

Test out query and response on:
http://127.0.0.1:8000/docs