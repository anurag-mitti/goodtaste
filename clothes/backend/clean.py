import sqlite3

c = sqlite3.connect('links.db')
cur = c.cursor()
cur.execute("DELETE FROM links WHERE url NOT LIKE 'http%'")
c.commit()
c.close()
print("Cleaned!")
