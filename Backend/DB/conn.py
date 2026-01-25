import psycopg2

import os

# Use the current system user (typically 'karthii' on this system)
db_user = os.getenv("USER", "karthii")

try:
    conn = psycopg2.connect(
        database="kioski",
        user="karthii",
        password="karthik",
        host="127.0.0.1",
        port=5432
    )
    cursor = conn.cursor()
except Exception as e:
    print(f"Error connecting to database: {e}")
    # Re-raise or handle as needed, but for now let's ensure it fails visibly if broken
    raise e
