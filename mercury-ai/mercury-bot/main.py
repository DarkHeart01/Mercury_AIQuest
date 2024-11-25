#import required libraries
from fastapi import FastAPI, HTTPException
import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List

#loading environment variable
load_dotenv('api_key.env')

api_key = os.environ.get('GENAI_API_KEY')

#configuring api key
genai.configure(api_key=api_key)

#loading fine tuned model
model = genai.GenerativeModel(model_name='tunedModels/mercury-w0aigfuv20g3')

#creating prompt template
def prompt_template(query, top_k_responses: List[str]):
    prompt = (
        f"Query: {query}\n\n"
        "This is a list of the top responses for this query:\n"
    )
    for i, response in enumerate(top_k_responses, start=1):
        prompt += f"{i}. {response}\n"
    
    prompt += (
        "\nYour task is to return an output answer for this query based on the top responses given above. "
        "The response should be clear, integrating key factors and points from all responses to return an optimal answer to the user's query. "
        "If you have an existing answer in the database, use points from that as well."
    )
    return prompt

#example implementation of prompt template
top_k_responses = ['You have to inform your superiors 15 days prior to leaving.', 
                   'You need to give your letter of resignation to the Employee Mgmt Head in the HR department.',
                   'You need to give 15 days notice. It is best that you speak to your boss about it beforehand.']
#alter accordingly to access top k responses from vector db


#defining function generate responses
def generate_response(prompt):
    response = model.generate_content(prompt)
    return response.text

#configure application
app = FastAPI()

#root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Mercury API!"}

#endpoint
@app.post("/generate/")
@app.get("/generate/")
async def generate_content(query):
    try:
        prompt = prompt_template(query, top_k_responses)
        return generate_response(prompt)
    except Exception as e:
        raise HTTPException(status_code = 500, detail = 'Failed to generate response.')