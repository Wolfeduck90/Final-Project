# chatbot_model.py
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage

chat = ChatOpenAI(model="gpt-4", temperature=0.7)

def handle_query(user_query):
    prompt = f"""
    You are a farming assistant for South African farmers. Provide practical, ethical advice in short, clear sentences.
    Question: {user_query}
    """
    response = chat([HumanMessage(content=prompt)])
    return response.content
