# matchmaking_model.py

import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import OneHotEncoder

# Load buyer demand data (fallback to historical if real-time fails)
def load_buyer_data():
    try:
        # Replace with live API or database query
        buyer_df = pd.read_csv("buyer_demand_south_africa.csv")
    except:
        buyer_df = pd.read_csv("historical_buyer_demand.csv")
    return buyer_df

# Load farmer profile data from sign-up
def load_farmer_data():
    return pd.read_csv("farmer_profiles.csv")

# Preprocess both datasets for matching
def preprocess_data(farmer_df, buyer_df):
    combined = pd.concat([farmer_df, buyer_df], ignore_index=True)
    encoder = OneHotEncoder()
    encoded = encoder.fit_transform(combined[['location', 'produce_type']]).toarray()

    numeric = combined[['expected_yield', 'harvest_date_days']].fillna(0)
    features = pd.DataFrame(encoded).join(numeric.reset_index(drop=True))
    return features[:len(farmer_df)], features[len(farmer_df):]

# Match farmers to buyers
def match_farmers_to_buyers(farmer_df, buyer_df):
    farmer_features, buyer_features = preprocess_data(farmer_df, buyer_df)
    model = NearestNeighbors(n_neighbors=3, metric='euclidean')
    model.fit(buyer_features)

    matches = []
    for i, farmer in farmer_features.iterrows():
        distances, indices = model.kneighbors([farmer])
        matched_buyers = buyer_df.iloc[indices[0]].to_dict('records')
        matches.append({
            "farmer_id": farmer_df.iloc[i]['farmer_id'],
            "recommended_buyers": matched_buyers
        })
    return matches
