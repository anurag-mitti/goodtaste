import sqlite3
import re
from playwright.sync_api import sync_playwright

def run_scraper_for_urls(urls, db_path):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = context.new_page()

        for url in urls:
            try:
                page.goto(url, timeout=30000, wait_until="domcontentloaded")
                # Try to get og:image and og:title
                image_url = None
                title = None
                
                try:
                    title = page.locator('meta[property="og:title"]').get_attribute('content', timeout=2000)
                except:
                    try:
                        title = page.title()
                    except:
                        title = "Unknown Product"

                try:
                    image_url = page.locator('meta[property="og:image"]').get_attribute('content', timeout=2000)
                except:
                    pass
                
                # Fallback to finding the largest image
                if not image_url or '1x1' in image_url or image_url.endswith('.gif'):
                    images = page.eval_on_selector_all("img", """imgs => imgs.map(img => {
                        return { src: img.src, w: img.naturalWidth || img.width || 0, h: img.naturalHeight || img.height || 0 };
                    })""")
                    if images:
                        valid_images = [img for img in images if img['w'] > 150 and img['h'] > 150 and img['src']]
                        if valid_images:
                            valid_images.sort(key=lambda x: x['w'] * x['h'], reverse=True)
                            image_url = valid_images[0]['src']
                
                if image_url and image_url.startswith('//'):
                    image_url = 'https:' + image_url
                elif image_url and image_url.startswith('/'):
                    from urllib.parse import urlparse
                    parsed = urlparse(url)
                    image_url = f"{parsed.scheme}://{parsed.netloc}{image_url}"

                conn = sqlite3.connect(db_path)
                c = conn.cursor()
                if image_url:
                    c.execute("UPDATE links SET image = ?, title = ?, status = 'completed' WHERE url = ?", (image_url, title or '', url))
                else:
                    c.execute("UPDATE links SET title = ?, status = 'failed' WHERE url = ?", (title or '', url))
                conn.commit()
                conn.close()

            except Exception as e:
                print(f"Failed {url}: {str(e)}")
                conn = sqlite3.connect(db_path)
                c = conn.cursor()
                c.execute("UPDATE links SET status = 'failed' WHERE url = ?", (url,))
                conn.commit()
                conn.close()

        browser.close()
