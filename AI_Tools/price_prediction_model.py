# Price_Prediction_Model.py

import pandas as pd
from sklearn.linear_model import LinearRegression

def train_model(market_data):
    """Train price predictor using crop yield + market trend index."""
    X = market_data[['expected_yield_kg', 'market_trend_index']]
    y = market_data['price_ZAR_per_kg']
    model = LinearRegression()
    model.fit(X, y)
    return model

def predict_price(model, user_input):
    """Estimate price from user input."""
    input_df = pd.DataFrame([{
        'expected_yield_kg': user_input['expected_yield_kg'],
        'market_trend_index': user_input['market_trend_index']
    }])
    prediction = model.predict(input_df)[0]
    return round(prediction, 2)

def generate_insight(predicted_price, baseline_price):
    """Text insight for farmer."""
    if predicted_price < baseline_price * 0.9:
        return f"⚠️ Prices are dropping (R{predicted_price}/kg). You might wait before selling."
    elif predicted_price > baseline_price * 1.1:
        return f"📈 Prices are rising (R{predicted_price}/kg). Good time to consider selling."
    else:
        return f"🤔 Prices are steady at R{predicted_price}/kg. Monitor market trends for changes."
# INPUT FORMAT
# user_input = {
#     "expected_yield_kg": 1000,
#     "market_trend_index": 0.85  # (e.g., seasonal demand indicator)
# }
