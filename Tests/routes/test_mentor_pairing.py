# Tests/routes/test_mentor_pairing.py

import pytest
from Backend.app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_mentor_pairing_valid(client):
    mentee_input = {
        "location": "Gauteng",
        "produce_type": "Tomatoes",
        "experience_years": 2
    }

    response = client.post('/api/mentor-pairing', json=mentee_input)
    assert response.status_code == 200

    data = response.get_json()
    assert "recommended_mentors" in data
    assert isinstance(data["recommended_mentors"], list)

def test_mentor_pairing_missing_input(client):
    response = client.post('/api/mentor-pairing', json={})
    assert response.status_code == 400
    assert "error" in response.get_json()
