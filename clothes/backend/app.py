import json
import sqlite3
import os
import uuid
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from scraper import run_scraper_for_urls

app = Flask(__name__)
CORS(app)

DB_PATH = 'links.db'
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS links (
            id TEXT PRIMARY KEY,
            url TEXT UNIQUE,
            category TEXT,
            title TEXT,
            image TEXT,
            status TEXT
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def categorize_url(url):
    url_lower = url.lower()
    if 'instagram.com' in url_lower:
        return 'Instagram'
    elif any(domain in url_lower for domain in ['amazon', 'flipkart', 'shopify', 'store', '/product', '/item', 'buy', 'cart', 'checkout', 'collections', 'myntra', 'ajio', 'zara', 'hm.com']):
        return 'Product'
    else:
        return 'Website'

@app.route('/api/process-urls', methods=['POST'])
def process_urls():
    data = request.json
    urls = data.get('urls', [])
    urls = list(set([u.strip() for u in urls if u.strip()]))
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    new_urls = []
    for url in urls:
        url = url.strip()
        if not url.startswith('http'):
            continue
        
        c.execute("SELECT url FROM links WHERE url = ?", (url,))
        if not c.fetchone():
            cat = categorize_url(url)
            link_id = str(uuid.uuid4())
            c.execute("INSERT INTO links (id, url, category, title, image, status) VALUES (?, ?, ?, ?, ?, ?)",
                      (link_id, url, cat, '', '', 'pending'))
            if cat == 'Product':
                new_urls.append(url)
    
    conn.commit()
    conn.close()

    if new_urls:
        threading.Thread(target=run_scraper_for_urls, args=(new_urls, DB_PATH)).start()
        
    return jsonify({"message": "Processing started", "new_count": len(new_urls)})

@app.route('/api/links', methods=['GET'])
def get_links():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM links ORDER BY rowid DESC")
    rows = c.fetchall()
    conn.close()
    
    return jsonify([dict(row) for row in rows])

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    link_id = request.form.get('id')
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
        
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file:
        ext = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else 'png'
        filename = f"{link_id}.{ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # We serve locally for now, frontend will access via a static route or we just construct file URL
        image_url = f"http://127.0.0.1:5000/uploads/{filename}"
        
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("UPDATE links SET image = ?, status = 'completed' WHERE id = ?", (image_url, link_id))
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Success', 'image_url': image_url})

from flask import send_from_directory
@app.route('/uploads/<path:filename>')
def serve_upload(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
