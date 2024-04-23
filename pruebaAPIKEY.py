import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access the API key from the environment
API_KEY = os.getenv("API_KEY")

# Now you can use the API key in your code
print("API Key:", API_KEY)
