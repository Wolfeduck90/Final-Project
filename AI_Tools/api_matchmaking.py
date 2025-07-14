# api_matchmaking.py
from flask import Flask, request, jsonify
from matchmaking_model import run_matchmaking, load_data

app = Flask(__name__)
data = load_data()

@app.route('/api/matchmaking', methods=['POST'])
def matchmaking_endpoint():
    user_input = request.json
    matches = run_matchmaking(user_input, data)
    return jsonify(matches)

if __name__ == '__main__':
    app.run(debug=True)
