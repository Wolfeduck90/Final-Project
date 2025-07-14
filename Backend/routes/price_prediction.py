# Backend/routes/price_prediction.py

from flask import request, jsonify
from AI_Tools.Price_Prediction_Model import train_model, predict_price, generate_insight
import pandas as pd

def price_prediction_endpoint():
    """Handle POST request to estimate crop price and give farmer feedback."""
    try:
        # Load dummy market data (replace with live API or SQL query later)
        market_data = pd.read_csv('DBS/dummy_market_data.csv')
        model = train_model(market_data)

        # Get user input from request
        user_input = request.get_json()
        if not user_input:
            return jsonify({"error": "Missing input"}), 400

        predicted_price = predict_price(model, user_input)
        baseline_price = market_data['price_ZAR_per_kg'].mean()
        insight = generate_insight(predicted_price, baseline_price)

        return jsonify({
            "predicted_price_ZAR_per_kg": predicted_price,
            "insight": insight
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
