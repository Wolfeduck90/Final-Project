# Backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app)  # Allow cross-origin requests if needed by frontend/mobile

# Health check route
@app.route('/')
def home():
    return jsonify({"message": "Inkululeko API is up and running."})

# Example: Route registration placeholder
from routes.matchmaking import matchmaking_endpoint
app.add_url_rule('/api/matchmaking', view_func=matchmaking_endpoint, methods=['POST'])

# Add more endpoint imports as needed from other route files

if __name__ == '__main__':
    app.run(debug=True)
