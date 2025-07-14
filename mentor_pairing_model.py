# mentor_pairing_model.py
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def assign_mentor(user_profile, mentor_profiles):
    """
    user_profile: dict (location, experience_years, expertise_area)
    mentor_profiles: DataFrame with mentor data
    """
    # Convert profiles to vectors
    combined = mentor_profiles.append(user_profile, ignore_index=True)
    vectors = pd.get_dummies(combined)
    
    user_vector = vectors.iloc[-1]
    mentor_vectors = vectors.iloc[:-1]
    
    similarities = cosine_similarity([user_vector], mentor_vectors)[0]
    top_indices = similarities.argsort()[-3:][::-1]

    return mentor_profiles.iloc[top_indices].to_dict('records')
