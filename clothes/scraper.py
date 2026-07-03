import json
import urllib.request
import re
from urllib.error import URLError, HTTPError
import time

def extract_meta(html_content, url):
    # Regex to extract og:title and og:image
    title_match = re.search(r'<meta[^>]*property=[\'"]og:title[\'"][^>]*content=[\'"]([^\'"]+)', html_content, re.IGNORECASE)
    if not title_match:
        title_match = re.search(r'<meta[^>]*content=[\'"]([^\'"]+)[\'"][^>]*property=[\'"]og:title[\'"]', html_content, re.IGNORECASE)
    if not title_match:
        title_match = re.search(r'<title>(.*?)</title>', html_content, re.IGNORECASE)
        
    image_match = re.search(r'<meta[^>]*property=[\'"]og:image[\'"][^>]*content=[\'"]([^\'"]+)', html_content, re.IGNORECASE)
    if not image_match:
        image_match = re.search(r'<meta[^>]*content=[\'"]([^\'"]+)[\'"][^>]*property=[\'"]og:image[\'"]', html_content, re.IGNORECASE)
    
    title = title_match.group(1).replace('&#39;', "'") if title_match else f"Product from {url.split('/')[2]}"
    image = image_match.group(1) if image_match else "https://via.placeholder.com/300x400?text=No+Image"
    return title, image

def scrape_urls(filepath):
    products = []
    with open(filepath, 'r', encoding='utf-8') as f:
        urls = [line.strip() for line in f if line.strip().startswith('http')]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    }
    
    for i, url in enumerate(urls):
        print(f"Scraping ({i+1}/{len(urls)}): {url[:50]}...")
        req = urllib.request.Request(url, headers=headers)
        try:
            with urllib.request.urlopen(req, timeout=5) as response:
                html = response.read().decode('utf-8', errors='ignore')
                title, image = extract_meta(html, url)
                products.append({
                    "name": title,
                    "image": image,
                    "url": url
                })
        except Exception as e:
            print(f"Failed to scrape {url[:50]}: {e}")
            products.append({
                "name": f"Product from {url.split('/')[2]}",
                "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
                "url": url
            })
        time.sleep(0.1) # Small delay to be polite
            
    with open('products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=4)
        
    print(f"Finished scraping {len(products)} items. Saved to products.json.")

if __name__ == '__main__':
    scrape_urls('urls.txt')
