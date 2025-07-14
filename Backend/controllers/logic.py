# Backend/controllers/logic.py

from AI_Tools.Matchmaking_Model import run_matchmaking
from AI_Tools.Price_Prediction_Model import predict_price, generate_insight
from AI_Tools.Mentor_Pairing_Model import assign_mentor

def get_match_results(farmer_input, buyer_data):
    """Wrapper for running matchmaking."""
    return run_matchmaking(farmer_input, buyer_data)

def get_price_advice(user_input, model, market_data):
    """Returns predicted price and selling recommendation."""
    predicted = predict_price(model, user_input)
    baseline = market_data['price_ZAR_per_kg'].mean()
    return predicted, generate_insight(predicted, baseline)

def get_mentor_matches(mentee_input, mentor_db):
    """Returns mentor recommendations."""
    return assign_mentor(mentee_input, mentor_db)
