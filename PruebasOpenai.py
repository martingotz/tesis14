import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Get the API key from the environment variables
OPENAI_API_KEY = os.getenv("API_KEY")

# Create an instance of the OpenAI client with the API key
client = OpenAI(api_key=OPENAI_API_KEY)

# Now you can use the client to make requests to the OpenAI API
completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a poetic assistant, skilled in explaining complex programming concepts with creative flair."},
        {"role": "user", "content": "Compose a poem that explains the concept of recursion in programming in only 10 words."}
    ]
)

print(completion.choices[0].message)