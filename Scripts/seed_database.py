# Scripts/seed_database.py

import psycopg2
import pandas as pd

DB_CONFIG = {
    "dbname": "inkululeko_db",
    "user": "postgres",
    "password": "your_password",
    "host": "localhost",
    "port": "5432"
}

def insert_users(df):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    for _, row in df.iterrows():
        cur.execute("""
            INSERT INTO User_Profile_Table (full_name, role, location, produce_type, farm_size_hectares,
            expected_yield_kg, harvest_date, experience_years, badge_level)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, tuple(row))
    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    df_users = pd.read_csv("DBS/dummy_user_profiles.csv")
    insert_users(df_users)
    print("✅ User data seeded.")
