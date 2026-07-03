import * as cheerio from 'cheerio';
import axios from 'axios';

export async function processUrl(url) {
  try {
    const { data: html } = await axios.get(url, {
      timeout: 10000,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(html);

    // Extract OpenGraph tags
    const title = $('meta[property="og:title"]').attr('content') || $('title').text() || url;
    const image = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
    const type = $('meta[property="og:type"]').attr('content') || '';
    
    // Categorization logic
    let category = 'Websites';
    const hostname = new URL(url).hostname;
    const pathname = new URL(url).pathname;

    if (hostname.includes('instagram.com') || hostname.includes('tiktok.com') || hostname.includes('youtube.com') && pathname.includes('/shorts')) {
      category = 'Reels';
    } else if (type.includes('product') || hostname.includes('amazon.com') || hostname.includes('shopify')) {
      category = 'Products';
    } else if (!image) {
      category = 'Requires Manual Upload';
    }

    return {
      url,
      title,
      image,
      category,
      status: 'success'
    };
  } catch (error) {
    throw new Error(error.message);
  }
}
