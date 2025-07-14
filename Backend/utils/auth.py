# Backend/utils/auth.py

from flask import request, jsonify

def require_api_key(valid_keys):
    """Decorator to restrict access using a simple API key."""
    def wrapper(func):
        def secured(*args, **kwargs):
            key = request.headers.get('x-api-key')
            if key not in valid_keys:
                return jsonify({"error": "Unauthorized"}), 403
            return func(*args, **kwargs)
        return secured
    return wrapper

def simulate_user_role(user_id, db):
    """Simulates role lookup from dummy DB (later from PostgreSQL)."""
    user = db.loc[db['user_id'] == user_id]
    if user.empty:
        return "Unknown"
    return user.iloc[0]['role']
#example use case
# from utils.auth import require_api_key

# VALID_KEYS = ["abc123", "inkululeko-dev"]

# @app.route('/api/secure-endpoint')
# @require_api_key(VALID_KEYS)
# def secure_endpoint():
#     return jsonify({"status": "Access granted"})
