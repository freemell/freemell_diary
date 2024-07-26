from flask import Flask, render_template, request, jsonify
import mysql.connector
from datetime import datetime

app = Flask(__name__)

db_config = {
    'user': 'root',          # Default XAMPP MySQL user
    'password': '',          # Default XAMPP MySQL password
    'host': '127.0.0.1',     # XAMPP MySQL server host
    'database': 'freemell_diary'
}

def init_db():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS entries
                      (id INT AUTO_INCREMENT PRIMARY KEY,
                       title VARCHAR(255) NOT NULL,
                       content TEXT NOT NULL,
                       date DATETIME NOT NULL)''')
    conn.commit()
    cursor.close()
    conn.close()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/add_entry', methods=['GET', 'POST'])
def add_entry():
    if request.method == 'POST':
        title = request.json['title']
        content = request.json['content']
        date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        cursor.execute('INSERT INTO entries (title, content, date) VALUES (%s, %s, %s)',
                       (title, content, date))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({'status': 'Entry added successfully!'})
    return render_template('add_entry.html')

@app.route('/entries', methods=['GET'])
def get_entries():
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM entries ORDER BY date DESC')
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    entries = [{'id': row[0], 'title': row[1], 'content': row[2], 'date': row[3]} for row in rows]
    return jsonify(entries)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
