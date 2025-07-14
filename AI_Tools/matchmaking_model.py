# Matchmaking_Model.py

import pandas as pd
from sklearn.neighbors import NearestNeighbors

def prepare_data(df):
    """Convert categorical features to numeric and scale yield."""
    df = df.copy()
    df = pd.get_dummies(df, columns=['location', 'produce_type'])
    df['harvest_days'] = (pd.to_datetime(df['harvest_date']) - pd.Timestamp.today()).dt.days
    df['expected_yield_kg'] = df['expected_yield_kg'].fillna(0)
    return df.drop(['full_name', 'harvest_date'], axis=1)

def run_matchmaking(farmer_input, buyer_db):
    """Return top buyer matches for a given farmer profile."""
    data = buyer_db.copy()
    data_proc = prepare_data(data)
    input_df = pd.DataFrame([farmer_input])
    input_proc = prepare_data(input_df)

    model = NearestNeighbors(n_neighbors=3)
    model.fit(data_proc)
    _, indices = model.kneighbors(input_proc)

    return data.iloc[indices[0]].to_dict('records')
# INPUT FORMAT 
# farmer_input = {
#     "full_name": "Sipho Dlamini",
#     "location": "Limpopo",
#     "produce_type": "Maize",
#     "expected_yield_kg": 5000,
#     "harvest_date": "2025-08-15"
# }