# AI_Tools/utils.py

import pandas as pd

def load_csv(file_path):
    """Safely load CSV file into a DataFrame."""
    try:
        return pd.read_csv(file_path)
    except Exception as e:
        print(f"Failed to load {file_path}: {e}")
        return pd.DataFrame()

def format_yield(value):
    """Normalize or format yield values."""
    try:
        return round(float(value), 2)
    except:
        return 0.0

def harvest_days_until(date_str):
    """Calculate days until harvest from a date string."""
    try:
        harvest_date = pd.to_datetime(date_str)
        delta = (harvest_date - pd.Timestamp.today()).days
        return max(delta, 0)
    except:
        return 0
