import json

with open('products.json', 'r', encoding='utf-8') as f:
    products_data = f.read()

script_content = f"""document.addEventListener('DOMContentLoaded', () => {{
    const gallery = document.getElementById('gallery');
    const loading = document.getElementById('loading');
    
    // Injecting JSON data directly to bypass local CORS/fetch restrictions
    const products = {products_data};

    function getDomain(url) {{
        try {{
            const {{ hostname }} = new URL(url);
            return hostname.replace('www.', '');
        }} catch (e) {{
            return 'External Store';
        }}
    }}

    function renderCard(product) {{
        const card = document.createElement('a');
        card.className = 'card';
        card.href = product.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const domain = getDomain(product.url);
        
        // Escape quotes for HTML attributes
        const safeName = product.name.replace(/"/g, '&quot;');

        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${{product.image}}" alt="${{safeName}}" class="card-img" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Image+Unavailable'; this.classList.add('error');">
            </div>
            <div class="card-content">
                <h2 class="card-title">${{product.name}}</h2>
                <span class="card-domain">${{domain}}</span>
            </div>
        `;
        return card;
    }}

    loading.style.display = 'none';
    if (products.length === 0) {{
        gallery.innerHTML = '<p style="text-align:center; color: var(--text-secondary); grid-column: 1/-1;">No products found.</p>';
        return;
    }}
    
    products.forEach(product => {{
        const card = renderCard(product);
        gallery.appendChild(card);
    }});
    
    // Add staggered animation
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {{
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {{
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }}, index * 50);
    }});
}});
"""

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(script_content)

print("Updated script.js successfully")
