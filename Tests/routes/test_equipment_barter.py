# Tests/routes/test_equipment_barter.py

import pytest
from Backend.app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_equipment_barter_valid(client):
    barter_input = {
        "owner_id": 1,
        "requester_id": 2,
        "equipment_type": "Tractor",
        "availability": "Weekends"
    }

    response = client.post('/api/equipment-barter', json=barter_input)
    assert response.status_code == 200

    data = response.get_json()
    assert "equipment_id" in data
    assert "message" in data
    assert data["message"] == "Barter listed"

def test_equipment_barter_missing_fields(client):
    response = client.post('/api/equipment-barter', json={"owner_id": 1})
    assert response.status_code == 400
    assert "error" in response.get_json()
