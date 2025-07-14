# Chatbot_Model.py

from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

# Initialize the OpenAI-powered agent (make sure your API key is set)
chat = ChatOpenAI(model="gpt-4", temperature=0.6)

def handle_query(user_question):
    """Return a helpful farming response based on user query."""
    prompt = f"""
    You are an assistant for South African farmers.
    Respond clearly and ethically. If asked about crop pricing, mentorship, or quality tips, provide concise insights using practical language.
    
    Farmer question: {user_question}
    """
    response = chat([HumanMessage(content=prompt)])
    return response.content
# Example Use case
# answer = handle_query("How do I improve tomato shelf life after harvest?")
# print(answer)
