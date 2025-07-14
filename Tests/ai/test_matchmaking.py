# Tests/ai/test_matchmaking.py

import pytest
import pandas as pd
from AI_Tools.Matchmaking_Model import run_matchmaking

@pytest.fixture
def dummy_buyer_data():
    return pd.DataFrame([
        {"buyer_id": 1, "location": "Gauteng", "produce_type": "Tomatoes", "interest_index": 0.95},
        {"buyer_id": 2, "location": "Limpopo", "produce_type": "Maize", "interest_index": 0.80}
    ])

def test_run_matchmaking_basic(dummy_buyer_data):
    farmer_input = {
        "location": "Gauteng",
        "produce_type": "Tomatoes",
        "expected_yield_kg": 1000
    }

    matches = run_matchmaking(farmer_input, dummy_buyer_data)
    assert isinstance(matches, list)
    assert len(matches) > 0
    assert matches[0]['location'] == "Gauteng"
