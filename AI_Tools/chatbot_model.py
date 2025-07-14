# Chatbot_Model.py

from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage
import os

# Ensure your OpenAI API key is set
# export OPENAI_API_KEY="your-key"  # If not set, set it in your environment

# Initialize the OpenAI-powered agent
try:
    chat = ChatOpenAI(model="gpt-4", temperature=0.6)
except Exception as e:
    print(f"Error initializing ChatOpenAI: {e}")
    chat = None

def handle_query(user_question):
    """Return a helpful farming response based on user query."""
    if not chat:
        return "Chat model not initialized. Check your API key and settings."
    prompt = f"""
    You are an assistant for South African farmers.
    Respond clearly and ethically. If asked about crop pricing, mentorship, or quality tips, provide concise insights using practical language.
    
    Farmer question: {user_question}
    """
    try:
        response = chat([HumanMessage(content=prompt)])
        return response.content if hasattr(response, "content") else str(response)
    except Exception as e:
        return f"Error processing query: {e}"

# Example Use case
# answer = handle_query("How do I improve tomato shelf life after harvest?")
# print(answer)
