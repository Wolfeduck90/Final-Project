# Backend/routes/forum_post.py

from flask import request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor

# DB connection config (use env variables in production)
DB_CONFIG = {
    "dbname": "inkululeko_db",
    "user": "postgres",
    "password": "your_password",
    "host": "localhost",
    "port": "5432"
}

def forum_post_endpoint():
    """Handle POST request to submit a forum post."""
    try:
        data = request.get_json()
        required_fields = ['author_id', 'topic', 'content']
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        conn = psycopg2.connect(**DB_CONFIG)
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO Peer_Learning_Forum_Table (author_id, topic, content, media_url)
            VALUES (%s, %s, %s, %s)
            RETURNING post_id;
        """, (data['author_id'], data['topic'], data['content'], data.get('media_url')))

        post_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Post created", "post_id": post_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
