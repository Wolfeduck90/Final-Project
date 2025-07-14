# Scripts/ingest_market_data.py

import pandas as pd
import requests

def fetch_tridge_data():
    """Simulate pull from Tridge's public price directory (replace with real endpoint)."""
    try:
        # Replace with Tridge API call or HTML scraping
        dummy_data = [
            {"produce_type": "Tomatoes", "expected_yield_kg": 1200, "market_trend_index": 0.85, "price_ZAR_per_kg": 18.68},
            {"produce_type": "Maize", "expected_yield_kg": 5000, "market_trend_index": 1.10, "price_ZAR_per_kg": 4.90}
        ]
        return pd.DataFrame(dummy_data)
    except Exception as e:
        print(f"Error fetching Tridge data: {e}")
        return pd.DataFrame()

def save_market_data(df, path="DBS/dummy_market_data.csv"):
    """Save cleaned market price dataset."""
    try:
        df.to_csv(path, index=False)
        print(f"✅ Market data updated at {path}")
    except Exception as e:
        print(f"Failed to save market data: {e}")

if __name__ == "__main__":
    market_df = fetch_tridge_data()
    if not market_df.empty:
        save_market_data(market_df)
