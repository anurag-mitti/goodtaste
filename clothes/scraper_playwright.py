import json
import time
from playwright.sync_api import sync_playwright, TimeoutError

def scrape_missing_images(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        products = json.load(f)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            viewport={'width': 1280, 'height': 720}
        )
        context.set_default_timeout(15000)
        page = context.new_page()

        for i, product in enumerate(products):
            if 'via.placeholder.com' in product['image'] or 'No Image' in product['image'] or product['image'] == '':
                print(f"Attempting to rescrape ({i+1}/{len(products)}): {product['url'][:60]}...")
                try:
                    page.goto(product['url'], wait_until='domcontentloaded')
                    time.sleep(2)
                    
                    og_image = None
                    try:
                        og_image = page.locator('meta[property="og:image"]').get_attribute('content', timeout=2000)
                    except:
                        pass
                    
                    if og_image:
                        product['image'] = og_image
                        print(f"  -> Found og:image: {og_image}")
                    else:
                        images = page.locator('img').all()
                        best_img = None
                        max_area = 0
                        for img in images:
                            try:
                                src = img.get_attribute('src', timeout=1000)
                                if not src or src.endswith('.svg') or 'logo' in src.lower() or 'icon' in src.lower():
                                    continue
                                box = img.bounding_box()
                                if box:
                                    area = box['width'] * box['height']
                                    if area > max_area and area > 10000: # at least 100x100
                                        max_area = area
                                        best_img = src
                            except:
                                pass
                        
                        if best_img:
                            if best_img.startswith('//'):
                                best_img = 'https:' + best_img
                            elif best_img.startswith('/'):
                                best_img = page.url.rstrip('/') + best_img
                                
                            product['image'] = best_img
                            print(f"  -> Found largest img: {best_img}")
                        else:
                            print(f"  -> Still couldn't find an image.")
                except TimeoutError:
                    print("  -> Timeout reached for this URL.")
                except Exception as e:
                    print(f"  -> Failed: {e}")
                
                # Save incrementally
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(products, f, indent=4)

        browser.close()

if __name__ == '__main__':
    scrape_missing_images('products.json')
