# Tests/routes/test_matchmaking.py

import pytest
from Backend.app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_matchmaking_valid(client):
    farmer_input = {
        "location": "Limpopo",
        "produce_type": "Maize",
        "expected_yield_kg": 4000,
        "harvest_date": "2025-09-01"
    }

    response = client.post('/api/matchmaking', json=farmer_input)
    assert response.status_code == 200

    data = response.get_json()
    assert "matches" in data
    assert isinstance(data["matches"], list)

def test_matchmaking_missing_input(client):
    response = client.post('/api/matchmaking', json={})
    assert response.status_code == 400
    assert "error" in response.get_json()
