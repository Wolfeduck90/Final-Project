# Mentor_Pairing_Model.py

import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_profiles(df):
    """Turn categorical and numeric profile features into comparable vectors."""
    df = df.copy()
    df['experience_years'] = df['experience_years'].fillna(0)
    df = pd.get_dummies(df, columns=['location', 'produce_type'])
    return df.drop(['full_name', 'badge_level', 'role'], axis=1)

def assign_mentor(mentee, mentor_db):
    """Return top matching mentors for one mentee profile."""
    mentors = mentor_db[mentor_db['role'] == 'Farmer'].copy()
    if mentors.empty:
        return []

    mentors_proc = preprocess_profiles(mentors)
    mentee_proc = preprocess_profiles(pd.DataFrame([mentee]))

    similarities = cosine_similarity(mentee_proc, mentors_proc)[0]
    top_matches = mentors.iloc[similarities.argsort()[-3:][::-1]]
    return top_matches.to_dict('records')
# INPUT FORMAT
# mentee_input = {
#     "full_name": "New Farmer",
#     "role": "Farmer",
#     "location": "Gauteng",
#     "produce_type": "Corn",
#     "experience_years": 0,
#     "badge_level": None
# }