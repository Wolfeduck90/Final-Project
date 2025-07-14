# Tests/ai/test_price_prediction.py

import pytest
import pandas as pd
from AI_Tools.Price_Prediction_Model import train_model, predict_price, generate_insight

@pytest.fixture
def dummy_market_data():
    return pd.DataFrame([
        {"produce_type": "Tomatoes", "expected_yield_kg": 1000, "market_trend_index": 0.85, "price_ZAR_per_kg": 19.40},
        {"produce_type": "Maize", "expected_yield_kg": 5000, "market_trend_index": 1.05, "price_ZAR_per_kg": 5.10}
    ])

def test_train_and_predict(dummy_market_data):
    model = train_model(dummy_market_data)
    assert model is not None

    input_data = {"expected_yield_kg": 1200, "market_trend_index": 0.90}
    prediction = predict_price(model, input_data)
    assert isinstance(prediction, float)
    assert prediction > 0

def test_generate_insight_message(dummy_market_data):
    baseline = dummy_market_data['price_ZAR_per_kg'].mean()
    insight = generate_insight(predicted_price=20.00, baseline_price=baseline)
    assert isinstance(insight, str)
    assert "R" in insight or "%" in insight
