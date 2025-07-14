# Backend/routes/equipment_barter.py

from flask import request, jsonify
import psycopg2

# Simple connection config (switch to environment variables in production)
DB_CONFIG = {
    "dbname": "inkululeko_db",
    "user": "postgres",
    "password": "your_password",
    "host": "localhost",
    "port": "5432"
}

def equipment_barter_endpoint():
    """Handles POST request for tool-sharing between farmers."""
    try:
        data = request.get_json()
        required = ['owner_id', 'requester_id', 'equipment_type', 'availability']
        if not all(field in data for field in required):
            return jsonify({"error": "Missing required fields"}), 400

        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO Equipment_Barter_Table (owner_id, requester_id, equipment_type, availability)
            VALUES (%s, %s, %s, %s)
            RETURNING equipment_id;
        """, (data['owner_id'], data['requester_id'], data['equipment_type'], data['availability']))

        equipment_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Barter listed", "equipment_id": equipment_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
