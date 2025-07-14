# price_prediction_model.py

import requests
import pandas as pd
from datetime import datetime

# Primary source: Tridge API (mocked for now)
def fetch_tridge_price(crop_name):
    """
    Fetch real-time price from Tridge (mocked endpoint).
    Replace with actual API call when available.
    """
    try:
        # Simulated response
        response = {
            "crop": crop_name,
            "price_ZAR_per_kg": 18.68,
            "trend": "down",
            "timestamp": "2025-07-14"
        }
        return response
    except Exception as e:
        print(f"Tridge fetch failed: {e}")
        return None

# Fallback source: Selina Wamucii
def fetch_selina_price(crop_name):
    """
    Fallback price fetch from Selina Wamucii (mocked).
    """
    try:
        # Simulated response
        response = {
            "crop": crop_name,
            "price_ZAR_per_kg": 19.82,
            "trend": "stable",
            "timestamp": "2025-07-13"
        }
        return response
    except Exception as e:
        print(f"Selina fetch failed: {e}")
        return None

# Final fallback: Historical average
def get_historical_average(crop_name):
    """
    Static fallback using historical data.
    """
    historical_prices = {
        "tomato": 25.00,
        "maize": 4.50,
        "onion": 12.00
    }
    return {
        "crop": crop_name,
        "price_ZAR_per_kg": historical_prices.get(crop_name, 0),
        "trend": "unknown",
        "timestamp": str(datetime.today().date())
    }

# Decision logic
def get_crop_price(crop_name):
    """
    Cascading fetch logic with fallback.
    """
    price_data = fetch_tridge_price(crop_name)
    if not price_data:
        price_data = fetch_selina_price(crop_name)
    if not price_data:
        price_data = get_historical
