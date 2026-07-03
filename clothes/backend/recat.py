import sqlite3
from app import categorize_url

c = sqlite3.connect('links.db')
cur = c.cursor()
cur.execute("SELECT id, url FROM links")
for row in cur.fetchall():
    id, url = row
    cat = categorize_url(url)
    cur.execute("UPDATE links SET category = ? WHERE id = ?", (cat, id))

c.commit()
c.close()
print("Recategorized!")
