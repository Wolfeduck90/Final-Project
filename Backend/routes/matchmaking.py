# Backend/routes/matchmaking.py

from flask import request, jsonify
from AI_Tools.Matchmaking_Model import run_matchmaking
import pandas as pd

def matchmaking_endpoint():
    """Handle POST request with farmer data and return top buyer matches."""
    try:
        # Load buyer dataset (could be external later)
        buyer_db = pd.read_csv('DBS/dummy_buyer_data.csv')

        # Get farmer input from the request
        farmer_input = request.get_json()
        if not farmer_input:
            return jsonify({"error": "No input provided"}), 400

        # Run matchmaking
        matches = run_matchmaking(farmer_input, buyer_db)
        return jsonify({"matches": matches})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
