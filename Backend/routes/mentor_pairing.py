# Backend/routes/mentor_pairing.py

from flask import request, jsonify
from AI_Tools.Mentor_Pairing_Model import assign_mentor
import pandas as pd

def mentor_pairing_endpoint():
    """Handle POST request from a farmer looking for a mentor."""
    try:
        # Load mentor database (filter to Farmers)
        mentor_db = pd.read_csv('DBS/dummy_user_profiles.csv')

        # Get mentee profile from request
        mentee = request.get_json()
        if not mentee:
            return jsonify({"error": "Mentee profile not provided"}), 400

        mentors = assign_mentor(mentee, mentor_db)
        return jsonify({"recommended_mentors": mentors})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
