document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const loading = document.getElementById('loading');
    
    // Injecting JSON data directly to bypass local CORS/fetch restrictions
    const products = [
    {
        "name": "SIXTY NINE TEE",
        "image": "http://monkblu.com/cdn/shop/files/monkblu-24.jpg?v=1729243449",
        "url": "https://monkblu.com/products/sixty-nine-tee?utm_medium=paid&utm_id=120213943088760700&utm_content=120213943552970700&utm_term=120213943088770700&utm_campaign=120213943088760700&fbclid=PAZXh0bgNhZW0BMABhZGlkAasWAF97qDwBp93iSYSXY3rYl36Qpo8MzBMJLfjCqtWA9xturuxiiQfNJvJgci47KVu3PCEC_aem_e_Kvq1LVXBa5O73sxm8cVA&utm_source=facebook&campaign_id=120213943088760700&ad_id=120213943552970700"
    },
    {
        "name": "Sagacity, India's finest Streetwear brand",
        "image": "http://thesagacity.in/cdn/shop/files/brigend-sagacity-logo-white-2048x169_f5955a13-1d1b-45e3-8218-4c4cce88e142.png?v=1739011596",
        "url": "https://www.thesagacity.in/products/egoist"
    },
    {
        "name": "Sagacity, India's finest Streetwear brand",
        "image": "http://thesagacity.in/cdn/shop/files/brigend-sagacity-logo-white-2048x169_f5955a13-1d1b-45e3-8218-4c4cce88e142.png?v=1739011596",
        "url": "https://www.thesagacity.in/products/egoist"
    },
    {
        "name": "Weapon No.10 - Fully Armoured T-shirt",
        "image": "http://thesagacity.in/cdn/shop/files/edit-84.jpg?v=1749319263",
        "url": "https://www.thesagacity.in/products/weapon-no-10-fully-armoured-t-shirt"
    },
    {
        "name": "Buy Yakuza blue sukajan bomber jacket for men online in India",
        "image": "https://d2wbq7o4qxi60y.cloudfront.net/8124834545826/1-800.webp",
        "url": "https://www.snitch.com/men-jackets/yakuza-blue-sukajan-bomber-jacket/8124834545826/buy?utm_source=google&utm_medium=cpc&utm_campaign=22148173910&utm_term=&utm_content=&gad_source=1&gad_campaignid=22148178857&gbraid=0AAAAACTMOKpLJXu0QTioSadvxuYbTrUnf&gclid=CjwKCAjw24vBBhABEiwANFG7y_8JNBdfFNPU3X2aLUE-E3RUZ_wwKUi2Fkxp2wPaW0pGVI68Or7O0RoCFbgQAvD_BwE"
    },
    {
        "name": "Black Dragon Embroidery Designer Shirt",
        "image": "http://bananaclub.co.in/cdn/shop/files/Black_Dragon_Embroidery_Shirt_3.jpg?v=1763009966",
        "url": "https://bananaclub.co.in/products/black-dragon-embroidery-shirt?variant=42205557325917&country=IN&currency=INR&utm_medium=google_cpc&utm_source=google&utm_content=google_shopping_pmax&utm_campaign=google_shopping_pmax&utm_source=GoogleAds&utm_medium=Google_CPC&utm_term=%7Bcampaignid%7D-%7C-%7Badgroupid%7D-%7C-%7Bcreative%7D-%7C-%7Bnetwork%7D-%7C-%7Bplacement%7D-%7C-%7Badposition%7D-%7C-%7Btarget%7D-%7C-%7Bkeyword%7D-%7C-%7Bmatchtype%7D-%7C-%7Btargetid%7D-%7C-%7Bfeeditemid%7D&gad_source=1&gad_campaignid=21436491352&gbraid=0AAAAAqUewjbeTULwEcjsYlafNIxK83HRC&gclid=CjwKCAjw24vBBhABEiwANFG7y6BsHgZDXO6troZSdcYX9CAdN1qwVonrh9hPmoEEJeRAQJssa3xDvBoCvJwQAvD_BwE"
    },
    {
        "name": "Product from overlaysnow.com",
        "image": "http://overlaysnow.com/cdn/shop/files/2_web_b277b7df-85e4-433d-b666-5be4042b29e4.jpg?v=1729776139",
        "url": "https://overlaysnow.com/products/blue-beige-full-sleeves-fearless-full-sleeve-t-shirt-ultra-soft?variant=46028366184700"
    },
    {
        "name": "Shop All",
        "image": "http://www.maincharacterindia.com/cdn/shop/files/Main_Character_India.webp?v=1739421168",
        "url": "https://www.maincharacterindia.com/collections/all?sort_by=best-selling&utm_medium=paid&utm_id=120223904332180069&utm_content=120223904604680069&utm_term=120223904332160069&utm_campaign=120223904332180069&fbclid=PAZXh0bgNhZW0BMABhZGlkAasfARkGu3UBp9A9PEQXYU4VVK9gnV87MuO0j-bAk0l_Re7fxhcjJlSwbEpoTBWPveaZhzW0_aem_GN_rpMTw0w6R398wRlBNDA&utm_source=facebook&campaign_id=120223904332180069&ad_id=120223904604680069"
    },
    {
        "name": "Redrum Pink Oversized T-Shirt",
        "image": "http://www.maincharacterindia.com/cdn/shop/files/140.jpg?v=1750665630",
        "url": "https://www.maincharacterindia.com/products/redrum-pink-oversized-t-shirt"
    },
    {
        "name": "LaCasa Money Heist Oversized T-Shirt",
        "image": "http://www.maincharacterindia.com/cdn/shop/files/From_Gym_to_Grind_Oversized_Graphic_Tees_That_Do_It_All_a5fe9942-bb40-49ad-8d3a-4a9e085e630c.webp?v=1768025181",
        "url": "https://www.maincharacterindia.com/products/la-casa-pink-oversized-t-shirt"
    },
    {
        "name": "34+35 Heavyweight-Oversized T-shirt",
        "image": "http://www.maincharacterindia.com/cdn/shop/files/154_f7152e52-381d-4677-882a-ce2201ac3fc0.jpg?v=1767361245",
        "url": "https://www.maincharacterindia.com/products/34-35-oversized-tshirt-black-240-gsm"
    },
    {
        "name": "IGRIS ARMOUR / SOLO LEVELING OVERSIZED T-SHIRT",
        "image": "http://zenin.co.in/cdn/shop/files/IMG_7780WEB34-min.jpg?v=1743757263",
        "url": "https://zenin.co.in/products/igris-armour-solo-leveling-oversized-t-shirt?utm_medium=paid&utm_id=120223730011220750&utm_content=120223730409910750&utm_term=120223730054390750&utm_campaign=120223730011220750&fbclid=PAZXh0bgNhZW0BMABhZGlkAase2LMUcW4Bp7bKNq-9-Ai9m9CYOyd2pYpNxy-q_PN9oYZ_75NK4dpE99PCVT6b2c1LclF6_aem_qQlgvYaUylP4D_S-qAjMjw&utm_source=facebook&campaign_id=120223730011220750&ad_id=120223730409910750"
    },
    {
        "name": "Product from www.monkbreed.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.monkbreed.com/products/hiss-kiss-tee-red"
    },
    {
        "name": "Product from www.monkbreed.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.monkbreed.com/products/horses-warriors-jacquard-hoodie"
    },
    {
        "name": "New Oversized Tees",
        "image": "http://strongsoul.in/cdn/shop/files/Strong_soul_SS_Website_logos_512.png?v=1644949370",
        "url": "https://strongsoul.in/collections/new-oversized-tees?page=2"
    },
    {
        "name": "Product from smuck.co.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://smuck.co.in/products/shenron-oversized-t-shirt-1-copy"
    },
    {
        "name": "Product from badandboujee.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://badandboujee.in/products/in-my-feeling-pink"
    },
    {
        "name": "Product from badandboujee.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://badandboujee.in/products/money-on-my-mind-pink-copy"
    },
    {
        "name": "Product from www.rockpapercizors.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.rockpapercizors.in/products/professional-procrastinator"
    },
    {
        "name": "Buy Shadow Grey Panel Oversized Hoodie for Men &amp; Women",
        "image": "http://wtflex.in/cdn/shop/files/shadow_panel_hoodie_Ai_wessite_front.png?v=1767708769",
        "url": "https://wtflex.in/products/shadow-grey-panel-oversized-hoodie"
    },
    {
        "name": "Dripcage Pink Heavyweight T-shirt",
        "image": "http://wtflex.in/cdn/shop/files/image_6.webp?v=1767789546",
        "url": "https://wtflex.in/products/dripcage-heavyweight-t-shirt"
    },
    {
        "name": "BUY New World Energy Pink Oversized T-shirt | What The Flex",
        "image": "http://wtflex.in/cdn/shop/files/newworld1.jpg?v=1778752320",
        "url": "https://wtflex.in/products/new-world-energy"
    },
    {
        "name": "Waves",
        "image": "http://vaymode.com/cdn/shop/files/wavesmock_1200x1200.png?v=1717266702",
        "url": "https://vaymode.com/collections/drop-a/products/waves?variant=48824230969664"
    },
    {
        "name": "Product from www.cerealhustler.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.cerealhustler.com/products/f-k-magic-oversized-heavy-french-cotton-t-shirt?utm_source=ig&utm_medium=Instagram_Reels&utm_campaign=CH+%7C++%7C+sale+statics+%7C+++%7C++%7C++%7C+Auto+%7C+OT+%7C+M%2BF+%7C+18-45+%7C+India+%7C+Manual+image+%7C++%7C+%2813+May+2025%29+magic+%E2%80%93+duplicate&utm_content=CH+%7C++%7C+sale+statics+%7C+++%7C++%7C++%7C+Auto+%7C+OT+%7C+M%2BF+%7C+18-45+%7C+India+%7C+Manual+image+%7C++%7C+%2829+March+2025%29+magic+light+sky&utm_id=120221391068540228_v2_s06_e6980_sp_111&utm_term=120227517325950228&fbclid=PAQ0xDSwKSXFFleHRuA2FlbQEwAGFkaWQBqyJKk6Om1AGnXRnWl8Em8ORB10jul1kgxusU-4u4Nxct6sh5ewgP-v4aWOlN8g-h6DOFFUI_aem_W4H8gFIbdz_b_x83fAltnQ&campaign_id=120221391068540228&ad_id=120227517325980228"
    },
    {
        "name": "Product from leakedd.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://leakedd.com/?utm_medium=paid&utm_id=120224258090120735&utm_content=120224258090140735&utm_term=120224258090130735&utm_campaign=120224258090120735&fbclid=PAQ0xDSwKSlP1leHRuA2FlbQEwAGFkaWQBqx9ToJw9zwGneOrRD-PMj44z3jWgAYSp1L3UGx10I8afuFJXxOVl_GuZpljkJA-9PtwBALc_aem_8xXxUWFxqSRGgMNVRxZI-A&campaign_id=120224258090120735&ad_id=120224258090140735"
    },
    {
        "name": "Kisses tee",
        "image": "http://vaymode.com/cdn/shop/files/kisses_new_mock_2_acc1ecd1-6373-4878-a2e1-026e156d4274_1200x1200.png?v=1782108110",
        "url": "https://vaymode.com/collections/drop-a/products/kisses-tee?fbclid=PAQ0xDSwKUYIlleHRuA2FlbQEwAGFkaWQBqyJzdIsAhAGntZyL5ho12iiYABvSTwspL_oY8kPrGiIwTxFkyMo2SSpUvdDxYlTVtfuUbSQ_aem_3n_WyN2g2uIusqnjr8SB9w"
    },
    {
        "name": "Waves",
        "image": "http://vaymode.com/cdn/shop/files/wavesmock_1200x1200.png?v=1717266702",
        "url": "https://vaymode.com/collections/oversized-tshirt/products/waves"
    },
    {
        "name": "Product from www.sevenseven.co.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.sevenseven.co.in/products/spidy?fbclid=PAQ0xDSwKUYmRleHRuA2FlbQEwAGFkaWQBqyDagjRiIwGnQHwoo8xZoyxOzsl0UpqnTa245SUNoO_JF3Rjk4EDCi4zovK_8yQZIoYagdA_aem_LR2A3sA3Y3Nv-75HCu-15A"
    },
    {
        "name": "Product from www.sevenseven.co.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.sevenseven.co.in/products/untitled-dec16_19-44"
    },
    {
        "name": "Product from www.lavishstripe.in",
        "image": "http://www.lavishstripe.in/cdn/shop/files/4.2_1_51fa54ee-ca03-407c-8d4a-dc1b70c9ce79.png?v=1752846559",
        "url": "https://www.lavishstripe.in/product-page/bubblegum-bliss-tee?fbclid=PAQ0xDSwKUZipleHRuA2FlbQEwAGFkaWQBqx5okEai0gGnj8uJKOw-Eygm5uVVjoak_tHv9jW6t1rI9wcxI7zCMh3iFL1Q7qLFRe0mFjg_aem_hW5ZFgVQkjxZErbgZc8eDQ"
    },
    {
        "name": "Run Fasta Tee",
        "image": "http://sahlud.in/cdn/shop/files/43428765-C265-448A-A615-69DA079DACEB.jpg?v=1732791951",
        "url": "https://sahlud.in/products/run-fasta-tee?utm_medium=paid&utm_id=120219544367270211&utm_content=120219544412750211&utm_term=120219544367330211&utm_campaign=120219544367270211&fbclid=PAQ0xDSwKUeLtleHRuA2FlbQEwAGFkaWQBqxsJ6ActYwGnDEi66zisaO6ni1PEsjWD7Cy_jD8P-5dvzyk9eeBnZ00EDD7XNkcXvXIzEgI_aem_XfqBN6_LjsSCUsTqdH7tvw&utm_source=facebook&campaign_id=120219544367270211&ad_id=120219544412750211"
    },
    {
        "name": "OVERSIZED T-SHIRTS",
        "image": "http://mecnex.com/cdn/shop/collections/Mecnex_453.png?v=1674299902",
        "url": "https://mecnex.com/collections/oversized-t-shirts"
    },
    {
        "name": "Product from shoplostandfound.in",
        "image": "https://cdn.shopify.com/s/files/1/0873/4854/3767/files/Lost_found0406_0529be00-be2c-4564-928a-6251f486af21.jpg?v=1774025904",
        "url": "https://shoplostandfound.in/products/drifted-glow?fbclid=PAQ0xDSwKWWBdleHRuA2FlbQEwAGFkaWQBqx4fcnZiXgGnZRIbsQOrFe3gBnsnErXaDsG0Cw2Kr6R2WMWsaOhRMgzCiQJ8AFL28YtFRUo_aem_8y0A29bjKL5wgFGZTj2ztA"
    },
    {
        "name": "ARTIST?",
        "image": "http://balremn.com/cdn/shop/files/RFREFREVGRTGVGREVG.webp?v=1712506849",
        "url": "https://balremn.com/products/artist?fbclid=PAQ0xDSwKWuUVleHRuA2FlbQEwAGFkaWQBqx-dSwky_gGnwpRCJif_He1NN_-MnDU-HL-uX7clymdKvWr4Ngx46V2CkveLb6tWR3YAg_U_aem_o7IT1zwVW3G2srhnIW3reg"
    },
    {
        "name": "NUMB",
        "image": "http://balremn.com/cdn/shop/files/QER1.png?v=1749043582",
        "url": "https://balremn.com/products/numb?variant=50736523837715"
    },
    {
        "name": "Product from www.cerealhustler.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.cerealhustler.com/products/f-k-magic-oversized-heavy-french-cotton-t-shirt?utm_source=ig&utm_medium=Instagram_Reels&utm_campaign=CH+%7C++%7C+sale+statics+%7C++%7C+ADV%2B++%7C++%7C++%7C+Auto+%7C++%7C++%7C++%7C++%7C++%7C++%7C+%2816+May+2025%29&utm_content=CH+%7C++%7C+sale+statics+%7C++%7C+ADV%2B++%7C++%7C++%7C+Auto+%7C++%7C++%7C++%7C++%7C++%7C++%7C+%2816+May+2025%29+%7C+Blue+B%2Fg&utm_id=120227578756070228_v2_s06_e6980_sp_111&utm_term=120227578756850228&fbclid=PAQ0xDSwKW1O9leHRuA2FlbQEwAGFkaWQBqyJYnS5mBAGn_BvMzEcDyEPp0J3f5CfwDxrkO-y0Di6VW7yc9rMoJYH0uFU4v7oIJubxAQw_aem_GYBMz5En0cnZIp58CI1RQA&campaign_id=120227578756070228&ad_id=120227578757490228"
    },
    {
        "name": "No Filter Tee",
        "image": "http://fearnomangear.com/cdn/shop/files/MG_6530-2_1.jpg?v=1745517184",
        "url": "https://fearnomangear.com/products/fuck-you-tee"
    },
    {
        "name": "Stooky - For the stars",
        "image": "https://stooky.in/cdn/shop/files/Coastal_rescue_black_f9a128b3-657c-40cb-b9f9-bb00fdc7fca2.jpg?v=1748177022&width=3840",
        "url": "https://stooky.in/products/polo-sweatshirt-nile-green"
    },
    {
        "name": "Product from www.thesouledstore.com",
        "image": "https://www.thesouledstore.com/static/img/newlogosticky.f7f01f0.png",
        "url": "https://www.thesouledstore.com/product/popeye-powerhouse-sleeveless-hoodie?utm_source=FB_IG_Instagram_Feed&utm_medium=TSS_NUA_DBA_Catalog_Sales_2024&utm_campaign=NUA_DBA_8%25LookalikeAllTimePurchase_AllProductsCatalog_FB%2BIG_Male_2024&utm_content=AllProducts-CatalogueSales_Combined_2&audience=new_customer&utm_id=6564348353033&utm_term=6564348365833&fbclid=PAQ0xDSwKZBRVleHRuA2FlbQEwAGFkaWQAAAYgJMSJAQGn1JlI9J7q2IjNEBAQaAQJYGLOp0wbfSai8QHVraAb0TGvich-MNl9Fldb4gM_aem_TnWOd6kJoSNX8Vnh6_c68A"
    },
    {
        "name": "Forest Fur Oversized T-shirt",
        "image": "http://www.ore-ofe.com/cdn/shop/files/forest-fur-oversized-t-shirt-7999260.jpg?v=1755285644",
        "url": "https://www.ore-ofe.com/products/forest-fur-oversized-t-shirt"
    },
    {
        "name": "Ogeez Shop",
        "image": "http://ogeez.shop/cdn/shop/files/ogg_0060399d-d91b-4349-93ab-4a9df7a6eabb.png?v=1705316837",
        "url": "https://ogeez.shop/collections/essential-reimagined-ogeez"
    },
    {
        "name": "Ogeez Shop",
        "image": "http://ogeez.shop/cdn/shop/files/ogg_0060399d-d91b-4349-93ab-4a9df7a6eabb.png?v=1705316837",
        "url": "https://ogeez.shop/products/hod-002-blk-pw24"
    },
    {
        "name": "Ogeez Shop",
        "image": "http://ogeez.shop/cdn/shop/files/ogg_0060399d-d91b-4349-93ab-4a9df7a6eabb.png?v=1705316837",
        "url": "https://ogeez.shop/products/street-fusion-zip-shirt"
    },
    {
        "name": "THUNDERSTRIKE EDITION - Hymns Wear",
        "image": "https://hymns.in/cdn/shop/files/7.3.png?v=1777558570",
        "url": "https://hymnswear.in/products/thunderstrike"
    },
    {
        "name": "\u20b91,799 | Cahoot men's Navy Blue &amp; Moon Grey Fleece Houndstooth Denim Jacket - Cahoot",
        "image": "https://cahoot.in/cdn/shop/files/CSMAWJK6059_1_2843d7b5-afad-4537-9cce-84c82af5f215.jpg?v=1728976238",
        "url": "https://campussutra.com/products/mens-navy-blue-moon-grey-fleece-houndstooth-denim-jacket_csmawjk6059?variant=45461169045762&utm_source=meta_ads&utm_medium=ig&utm_campaign=TOF_conv_Highpotential_DPA&utm_content=High+Potential+DPA+%E2%80%93+Copy&utm_id=120219765954680189_v2_s01&utm_term=120220663304590189&fbclid=PAQ0xDSwKkMERleHRuA2FlbQEwAGFkaWQBqyD-xb5gXQGnCTZ-Stwa3XeHHHbQBiuukSSvuXd70zuQE_9_IYUKjoBp5wiGw6p1iGFKCNU_aem_yXEz59elMhTLZexK0T-ynA&campaign_id=120219765954680189&ad_id=120220663304580189"
    },
    {
        "name": "\u20b91,799 | Cahoot men's Saltbox Beige Fur-Lined Suede Bomber Jacket - Cahoot",
        "image": "https://cahoot.in/cdn/shop/files/CSMAWJK7006_1_16f4dfdc-6977-4c0c-94b2-b7d3d587be07.jpg?v=1728547931",
        "url": "https://campussutra.com/products/mens-saltbox-beige-fur-lined-suede-bomber-jacket_csmawjk7006?utm_source=meta_ads&utm_medium=ig&utm_campaign=TOF_conv_Highpotential_DPA&utm_content=High+Potential+DPA+%E2%80%93+Copy&utm_id=120219765954680189_v2_s01&utm_term=120220663304590189&fbclid=PAQ0xDSwKkMRVleHRuA2FlbQEwAGFkaWQBqyD-xb5gXQGnCTZ-Stwa3XeHHHbQBiuukSSvuXd70zuQE_9_IYUKjoBp5wiGw6p1iGFKCNU_aem_yXEz59elMhTLZexK0T-ynA&campaign_id=120219765954680189&ad_id=120220663304580189"
    },
    {
        "name": "Buy Oversized &amp; Baggy T-Shirts for Men Online in India | Trendy Streetwear \u2013 CrazyMonk",
        "image": "http://crazymonk.in/cdn/shop/files/New-Logo-2024-s4.webp?height=628&pad_color=fff&v=1714044239&width=1200",
        "url": "https://crazymonk.in/collections/graphic-oversized-t-shirts?utm_medium=paid&utm_id=120226692705360654&utm_content=120226694346020654&utm_term=120226692705340654&utm_campaign=120226692705360654&fbclid=PAQ0xDSwKwGglleHRuA2FlbQEwAGFkaWQBqyGKog8TvgGneUbnJh43vxhpW7SLnalFX9dVlRYqwui5FN0ZzZ4KxbEkpYwfZD3NaMV734k_aem_bC4gHT-8m4blBINiMIxOxQ&utm_source=facebook&campaign_id=120226692705360654&ad_id=120226694346020654"
    },
    {
        "name": "Hoodies",
        "image": "http://whytee.in/cdn/shop/files/1E5890A7-B463-4208-8CA9-AB34FA18F4D7.jpg?v=1689002785",
        "url": "https://whytee.in/collections/hoodies"
    },
    {
        "name": "Sagacity, India's finest Streetwear brand",
        "image": "http://thesagacity.in/cdn/shop/files/brigend-sagacity-logo-white-2048x169_f5955a13-1d1b-45e3-8218-4c4cce88e142.png?v=1739011596",
        "url": "https://www.thesagacity.in/products/egoist?utm_content=%7B%7Bad_name%7D%7D_%7B%7Bad_id%7D%7D&utm_source=ig&variant=50583884759349&media_type=image&utm_medium=paid&utm_campaign=%7B%7Bcampaign_name%7D%7D&utm_term=%7B%7Badset_name%7D%7D_%7B%7Badset_id%7D%7D&utm_id=120222917615780417&fbclid=PAQ0xDSwKyu3RleHRuA2FlbQEwAGFkaWQBqx70PDAfsQGnIkEvK5nzjA7obAHRM2_G8iMHIFzVx5HPflnkuqaW-JHKOqpCcs6PHRyKOGc_aem_UwSbpog-OXjx7tB-_4pFFQ&campaign_id=120222917615780417&ad_id=120223848948390417"
    },
    {
        "name": "\u20b9999 | Cahoot Men's Daisy White Double-Breasted Moziac Shirt - Cahoot",
        "image": "https://cahoot.in/cdn/shop/files/CSMSSRT8451_0.jpg?v=1780125236",
        "url": "https://campussutra.com/products/mens-daisy-white-double-breasted-moziac-shirt_csmssrt8451?variant=45964969246978&utm_source=meta_ads&utm_medium=ig&utm_campaign=TOF_CS_New+arrivals_Men+Oct+7+(DPA)&utm_content=New+arrivals+30D+Non+winter+Autocatalog+DPA&utm_id=120219765954640189_v2_s01&utm_term=120219765954940189&fbclid=PAQ0xDSwK36vtleHRuA2FlbQEwAGFkaWQBqyD-yVD8_QGnLnSlqoCuENDe6w424IY1rROe2DK2m0xpNb6kv6_Y2LQmlqpS303xsRQR_Zs_aem_Gx434y9gcWp7dy9lkTvJIw&campaign_id=120219765954640189&ad_id=120219765955160189"
    },
    {
        "name": "Buy Black Joggers for Comfort &amp; Style | Bonkers Corner",
        "image": "http://www.bonkerscorner.com/cdn/shop/files/black-joggers-xs-bonkerscorner-store-33686150152292.jpg?v=1728983987",
        "url": "https://www.bonkerscorner.com/products/black-joggers?_pos=5&_sid=6b5154ff6&_ss=r"
    },
    {
        "name": "Stonescence Bomber Jacket \u2013 Premium Style &amp; Comfort",
        "image": "http://stonescence.in/cdn/shop/collections/Women_Cropri_4.png?v=1745955328",
        "url": "https://stonescence.in/collections/bomber-jacket?fbclid=PAQ0xDSwLTjEpleHRuA2FlbQIxMQABpz-Pi5IDOvfCk5W4CHD95lppJqgA8hhI1hw5w_UOK7m_aJpStRFNMU33sroJ_aem_cwxIjjuUyoDseiIWkVJPcA"
    },
    {
        "name": "FIRST BLOSSOM WHITE SHIRT",
        "image": "http://firvt.com/cdn/shop/files/B1E89E1D-53E6-4B01-A478-A36296A9E95F.jpg?v=1746547820",
        "url": "https://firvt.com/collections/frontpage/products/first-blossom-white-shirt?utm_source=facebook&utm_medium=paid&utm_campaign=PG+%3A+FT+I+ABO+I+Testing+I+12%2F03%2F25&utm_content=PG+%3A+FT+I+ABO+I+Testing+I+Broad++I+White+Shirt+%7C+23%2F06%2F25&utm_term=PG+%3A+FT+I+ABO+I+Testing+I+Broad++I+White+Shirt+I+27%2F06%2F25&audience=new_audience&utm_id=120218601101620722&fbclid=PAQ0xDSwLWO8hleHRuA2FlbQEwAGFkaWQBqyOGTec_0gGn_PuQswVy6VABLYZ0ZXsqgS4R8BU3pADLVSmbtpmuYxZac8D5kgkU0wUaFRE_aem_4Uy0wfZLKQmdoxDy3Q16mw&campaign_id=120218601101620722&ad_id=120228874340660722"
    },
    {
        "name": "ROXYLANE\u00ae Official Website",
        "image": "https://roxylane.in/cdn/shop/files/Desktop_version.jpg?v=1780597341&width=1500",
        "url": "https://roxylane.in/?fbclid=PAQ0xDSwLZfBtleHRuA2FlbQIxMQABpz2dlr_b53m4-_osaaM421P59qzlQxJJrMjNUet89TkcsYjWi7KdA8jFj1LB_aem_fNpjFI7B_E6hFCiXrTRTAg"
    },
    {
        "name": "Buy Oversized &amp; Baggy T-Shirts for Men Online in India | Trendy Streetwear \u2013 CrazyMonk",
        "image": "http://crazymonk.in/cdn/shop/files/New-Logo-2024-s4.webp?height=628&pad_color=fff&v=1714044239&width=1200",
        "url": "https://crazymonk.in/collections/graphic-oversized-t-shirts?utm_medium=paid&utm_id=120226693296540654&utm_content=120226693346280654&utm_term=120226693296600654&utm_campaign=120226693296540654&fbclid=PAQ0xDSwLgpeZleHRuA2FlbQEwAGFkaWQBqyGKeULkzgGnyXdblPfuYsroUYTeOPfBicEqD01v63oOANrm88Y8DfTSlw3Zk7Tgkq8ZtlA_aem_oz-5Ycfi7UZcvwH5w2wGsQ&utm_source=facebook&campaign_id=120226693296540654&ad_id=120226693346280654"
    },
    {
        "name": "Latest Oversized T-shirts",
        "image": "http://www.thebtclub.com/cdn/shop/files/Logo_shopify.jpg?v=1624265903",
        "url": "https://www.thebtclub.com/collections/text-oversized-tees?utm_content=Allproducts_catalog&utm_source=ig&utm_medium=Instagram_Feed&utm_campaign=AllProducts_Advantage++Campaign&utm_id=6696871478451_v2_s09_e7235_sp_111&utm_term=6696871478851&fbclid=PAQ0xDSwLnSsVleHRuA2FlbQEwAGFkaWQAAAYYCjHuiwGn4hLJyjhX0-4ZvQnQjEwChUyPJ9IspqAoRVpdC4jrA5cwb2Om4shIHVEdDco_aem_POCAJ-7GbisPZzPa3I5cSw"
    },
    {
        "name": "Product from www.thesouledstore.com",
        "image": "https://www.thesouledstore.com/static/img/newlogosticky.f7f01f0.png",
        "url": "https://www.thesouledstore.com/product/fantastic-four-men-high-top-sneakers?utm_source=FB_IG_Instagram_Feed&utm_medium=TSS_NUA_DBA_Catalog_Sales_2024&utm_campaign=NUA_DBA_8%25LookalikeAllTimePurchase_AllProductsCatalog_FB+IG_Male_2024&utm_content=Common_Common_Others_NUATapInForStyleFrameCatalog_Common_Model_Carousel_The%20Souled%20Store_21136_NA_3388&audience=new_customer&utm_id=6564348353033&utm_term=6564348365833&fbclid=PAQ0xDSwLphb5leHRuA2FlbQEwAGFkaWQAAAYrEv-36QGnu5l2XpzKnN4Y8LIXct5wbjAC6XevgOcvdf-Kyt6wXVZ19G6VL3_ZJv3TEf4_aem_soG-cKv0UAEVV3-JPwWNgQ"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-2.cdninstagram.com/v/t51.71878-15/685691170_1482488243263812_3318424300126842665_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=FGnLYtJiaLwQ7kNvwEgPVKY&_nc_oc=Adr1IVEHwH566MmjF5zI7FgANp0vexUCXwVZaTcsdDzxmdRISQaQjf96HGMKKmCuHZE&_nc_zt=23&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=wp31jIOdTukxt3YQ-NioUw&_nc_ss=79a8c&oh=00_AQD_snUI93ABjs14o8UvQap1xL56iXmbyy6sO6INTJbR7w&oe=6A4CC183",
        "url": "https://www.instagram.com/p/DMRb8Z7gg4-/?igsh=aXl1OHRuY3EwMHhh"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-2.cdninstagram.com/v/t51.75761-15/472591889_18053379995278411_7123843152236760675_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=N2Xkz_Te99IQ7kNvwHUAQJM&_nc_oc=Adr49brXyAvgZeBxdzzegJ5dLKP3EBDR0j_FNep-NnzpyV9ph77yb1ILGbps22kczdU&_nc_zt=23&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=LP7oUEm5jo758Lx0AvpD_A&_nc_ss=7ba8c&oh=00_AQBErOZU3AcS8SvyvhiggpCf2OD_DywCBZYRxUItp_XWQg&oe=6A4C93E7",
        "url": "https://www.instagram.com/reel/DFqG5iOivhC/?igsh=azh3Mm5tNzd1YTY0"
    },
    {
        "name": "Men's Clothing | Banana Club",
        "image": "http://bananaclub.co.in/cdn/shop/files/Untitled_design_7_3ba689ae-d247-4a36-93b3-088123a87b77.png?v=1737789127",
        "url": "https://bananaclub.co.in/products/pale-grey-gurkha-pant?variant=42967645749341&media_type=image&utm_source=MetaAds&utm_medium=Web&utm_campaign=New_Customers&utm_content=New_Customer_Gurkha_Pants(8375)_DPA&utm_term=120215332539430242-%7C-Instagram_Feed&utm_id=120212248341810242&fbclid=PAQ0xDSwL8ZS9leHRuA2FlbQEwAGFkaWQBqyXMEXaU4gGni2UFRG9zYe4rQb1Bloh0xvcU6e8ZQM8zKivd5ogNIBw-nnHxMpn5HAGkOa0_aem_s0EnhAArKYa_Ts9tx4_GDg&campaign_id=120212248341810242&ad_id=120215332539430242"
    },
    {
        "name": "Crease Defender",
        "image": "http://www.shoegr.com/cdn/shop/files/SHOEGR_Crease_Defender_for_Preventing_Sneaker_Creases.webp?v=1764240628&width=2048",
        "url": "https://www.shoegr.com/products/crease-protector-for-shoes-and-sneakers?utm_source=Instagram&utm_medium=Reels&utm_campaign=Shoegr-Purchase-IG&utm_id=23853291926100523&utm_content=23862183656770523&utm_term=23853291926160523&fbclid=PAQ0xDSwLxqH9leHRuA2FlbQEwAGFkaWQBqyO5TEsTDAGnoxdJLVUyyyaJINw438mLXEcAq1JZiHKfzYX4HcNovc8Csmadb4KFYz6XcLM_aem_6k8IN2d0xdJSpOmhIdSvBA"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-2.cdninstagram.com/v/t51.75761-19/479495361_17857074561367648_8179075357905173264_n.jpg?stp=dst-jpg_s100x100_tt6&_nc_cat=102&ccb=7-5&_nc_sid=bf7eb4&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=WARTtR9idtQQ7kNvwEpdxms&_nc_oc=AdpgrUwwjEJGXPzCX6L1-P_hxF18FUxDZbQUlcCc28j6BQavEOc2cvgHmT7BuUGffEg&_nc_zt=24&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=a1mrPRWHHnUinn8r7_h_JA&_nc_ss=7ba8c&oh=00_AQD8Kv9QH-x66DVAkZZgrDwJUQJJhYiU1gzJMyfZnc4GLA&oe=6A4C8D7E",
        "url": "https://www.instagram.com/daremonk?igsh=MTZxb3FpZ2F0Y2FoeQ=="
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-2.cdninstagram.com/v/t51.71878-15/481888833_408922262306041_8405140554034658723_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=108&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=xWxT-HDTFdQQ7kNvwHNXkSd&_nc_oc=Adq4EW2VEdoRzBvAME8fH-JL4Owh7-wALZktTl-DGO7kHihNQWMKTmc5X795rjTGlu4&_nc_zt=23&_nc_ht=scontent-bom5-2.cdninstagram.com&_nc_gid=BVMJglnkvVrNrH1k4vdiuA&_nc_ss=7ba8c&oh=00_AQBWbdYBXplWx-nb3onGY8JjkT2w7XgAdHx7TftX_ke5tA&oe=6A4C9CE2",
        "url": "https://www.instagram.com/reel/DGk0AXWzEW2/?igsh=MTRrNHB2cGtmMjY0ag=="
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-1.cdninstagram.com/v/t51.71878-15/501195659_1055032626510530_6717767571088392899_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=o47-5i4UFToQ7kNvwEFvOQz&_nc_oc=AdqSijVrxmZ8qk_xln7vMR8kDaVy8WV-XK6CvyipmADl-KwIejuGoC96EQ4-Zn-Y-Kg&_nc_zt=23&_nc_ht=scontent-bom5-1.cdninstagram.com&_nc_gid=FHiMw0hYL-RfvKMjleFmHw&_nc_ss=7ba8c&oh=00_AQCy1osgNT7hnFjzygAL8QfveUi5gvlURlpFkAPfvV9S9Q&oe=6A4C9887",
        "url": "https://www.instagram.com/reel/DKJ4Re3zL04/?igsh=NHp2NnJiYTUzajBh"
    },
    {
        "name": "Product from www.googleadservices.com",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChsSEwj1yozg7PuOAxUoD4MDHfQxJPgYACICCAEQFxoCc2Y&co=1&gclid=CjwKCAjwwNbEBhBpEiwAFYLtGDei2xxBf3K3ma5YpREJY4jYGxyRVe-3WzrfjnuA6dJR0KSujsS59BoCyCcQAvD_BwE&sph=&ei=v0KWaNmbLPaxwcsPq5-NgAY&ohost=www.google.com&cid=CAESd-D2UUm84HXocI0IvOSmbvhI5c4hvxAaiBUYA8hzd0dop6JjLj7dq18MBCYVgvfy01vGaLERxROHGfA5FPjTSIcxHmzizB6ilNOiznAFF9YVbCDOOTQnJAtmzZgX_0arzK4DogaIu4Mbf7xN_BG_zhgtZA54UjlV&sig=AOD64_3eBE9Si6UQWRU6tnNxdhXwVy-Ggg&ctype=5&q=&sqi=2&ved=2ahUKEwiZ94fg7PuOAxX2WHADHatPA2AQwg8oAHoECAkQGQ&adurl="
    },
    {
        "name": "Daily Loose Solid Color Long Sleeved Shirt",
        "image": "http://offduty.in/cdn/shop/files/DLS1.webp?v=1726205376",
        "url": "https://offduty.in/products/daily-loose-solid-color-long-sleeved-shirt?utm_content=Facebook_UA&utm_source=facebook&variant=41825356808289&utm_medium=paid&utm_id=120219731443400159&utm_term=120219731443380159&utm_campaign=120219731443400159&fbclid=PAQ0xDSwMFpQNleHRuA2FlbQEwAGFkaWQBqyTmSnMsjwGnhVhyoA8GDp-aDXNaBA4sreaVhUOaSc18KmkRnA8E_WO_vgoVMK6KxIWAaJ0_aem_jCfqr68GATLRnFy4HI-noQ&campaign_id=120219731443400159&ad_id=120219731530500159"
    },
    {
        "name": "Firangi Yarn Spread Collar Full Sleeves Sheen Party Shirt - Black/Wine",
        "image": "http://firangiyarn.com/cdn/shop/files/DSC08943_16b4c313-bc19-4903-b2f1-880226c7978d.jpg?v=1752823510&width=2048",
        "url": "https://firangiyarn.com/products/firangi-yarn-spread-collar-full-sleeves-sheen-party-shirt-black-wine-1?utm_source=Facebook&utm_medium=cpc&utm_campaign=VG+-+TOF+-+Sheer+Party+Shirts+-+17/07/25&utm_content=VG+-+TOF+-+Adv+-+Sheer+Party+Shirts+-+17/07/25&utm_id=120228559151500730&utm_term=120228559151520730&fbclid=PAQ0xDSwMIN8dleHRuA2FlbQEwAGFkaWQBqyM9B5xyWgGnZobFt9OsaMAhj7GlYn5Q-q_tiQEnvs6b2xjyiCpt3_X7xUZiY3SwaJC927A_aem_SkRLDk7nXQBXcjAzGY4lBA"
    },
    {
        "name": "The Vacation Edit",
        "image": "https://cdn.shopify.com/s/files/1/0683/8947/0389/files/5feet11_Banner.png?v=1742386845",
        "url": "https://www.5feet11.com/collections/the-vacation-edit?utm_medium=CPM&utm_campaign=5feet11_1_Aug_Drop&utm_id=120231097482340153&utm_term=Persona_Dating&utm_content=120231594806190153&fbclid=PAQ0xDSwMJfEdleHRuA2FlbQEwAGFkaWQBqyX_peVbqQGnSOFe6DN8sCmkN4hu2hIqar8qY_7p_VyKNESjBYqCX7hJyHwAHBQCnXcuBJY_aem_5PfB63dHpzKXolf3wEyF6Q&utm_source=facebook"
    },
    {
        "name": "Eyes On You T-shirt",
        "image": "http://owr.life/cdn/shop/files/Artboard1_cefec023-1d0c-48e1-b671-14a2d4f3bc8f.jpg?v=1770539325",
        "url": "https://owr.life/products/eyes-on-you-t-shirt?utm_medium=paid&utm_id=6774080979532&utm_content=6862479748132&utm_term=6862479748332&utm_campaign=6774080979532&fbclid=PAQ0xDSwMWoAZleHRuA2FlbQEwAGFkaWQAAAY9y663PAGnuOLlPaUyCZ0nyMO7XAbdx7zn9fComcwTyfo6AYjwn7kBcG6KGsxv0ME_Lm4_aem_j6inkIb1JGmMEb5DpJ1Kpg&utm_source=facebook&campaign_id=6774080979532&ad_id=6862479748132"
    },
    {
        "name": "Urban Chaos Printed Hoodie",
        "image": "http://fromthestreets.in/cdn/shop/files/4_f5d43f84-a73b-47ad-85f1-438459a3841e.jpg?v=1702023181",
        "url": "https://fromthestreets.in/products/printed-hoodie-1?utm_content=Facebook_UA&utm_source=facebook&variant=47176942321962&utm_medium=paid&utm_id=120231504903400789&utm_term=120231504903380789&utm_campaign=120231504903400789&fbclid=PAQ0xDSwMazIBleHRuA2FlbQEwAGFkaWQBqyXquTRZVQGnwTE-afcdmmpUCzPFAquxCGwSbkNA0tHSmXF0XAtp4sJ6PhAsfZZ1dS-RnqA_aem_W3CAXl_5O6ygdMnChtsvdQ&campaign_id=120231504903400789&ad_id=120231504903390789"
    },
    {
        "name": "Crazymonk - Online Shopping for Men &amp; Women",
        "image": "http://crazymonk.in/cdn/shop/files/New-Logo-2024-s4.webp?height=628&pad_color=fff&v=1714044239&width=1200",
        "url": "https://crazymonk.in/products/cm-os-hood-division-11-jacket?utm_medium=paid&utm_id=120232563144680654&utm_content=120232580106450654&utm_term=120232563144740654&utm_campaign=120232563144680654&fbclid=PAZXh0bgNhZW0BMABhZGlkAasm5VysvE4Bp39TQ428uo86NVUBwMAWZJdlvQl4Hnu_tG7qN6LNWJZPFoxTGH4kIlAwUZeh_aem_2w8z49qSbswFlxTkDukHWw&utm_source=facebook&campaign_id=120232563144680654&ad_id=120232580106450654"
    },
    {
        "name": "Society Oversized Summer Hoodie",
        "image": "http://fromthestreets.in/cdn/shop/files/Hoodie4-min.png?v=1720761089",
        "url": "https://fromthestreets.in/products/society-oversize-summer-hoodie?utm_content=Facebook_UA&utm_source=facebook&variant=48247926456618&utm_medium=paid&utm_id=120229999056910789&utm_term=120229999056940789&utm_campaign=120229999056910789&fbclid=PAdGRleAMkCMlleHRuA2FlbQEwAGFkaWQBqySMOCtqFQGneyvMlJPlp17VNbwSNiKQiCRqhHfzyz0jedxIVWNL2xEvYKW6fNRnAQZ6PJA_aem_BFtWIMWaAsz6jnykAgdK6w&campaign_id=120229999056910789&ad_id=120229999056920789"
    },
    {
        "name": "Men&#x27;s Hoodies - Shop Stylish Hoodies for Men Online in India",
        "image": "https://images.bewakoof.com/lib/icon/app-logo.png",
        "url": "https://www.bewakoof.com/hoodies-for-men?_branch_referrer=H4sIAAAAAAAAA6WTX4%2BiMBTFPw2%2BocgflU3IBh3dddeZuOtONL40hV6gA7Sdtojrw3z2LbqjL26yyRBCuPe0p%2Ff8CIXWQn0aDBJoccl51sdC9CvKysFny%2FU9EWGU4RQSzsveW4prgWnOoul8G6OhO3FDhMlvnlO0wRUotJZcCUg12kKCNusYPQJDI3sBie06bmAcCswYVNHNMwOsGwmRMSaW62ByAKmpoizvmQEIqFJzgRpZRUU3quXFlrswd9u2%2FevQKa9Nq%2BCcUFB2xqVdA7O8RWeR4apKcFp%2BxIMAiA4KElgX0f9ta3SNFG9kCre0Xa8GQps6SkV6Lj%2FOFBNESTQ0hTcKgtAPR57neJOLokDfVG88MZc3uqjvJ7%2Fr7nDiT0I3CIfX3QzXEJkzzYexxjPz9K9vXy%2BJr%2FWWMg2yBSyvLdfegLDd2yBnuzVIxRlGF4Nzmr8LuzQGNuXKcFaKHgB14A8UWoOwUtCpmBHJKfnXig7p%2FTxn2NwMyfQ9WJ1sAtT3UGVJWhnTdbzfFU6SPxX7rTN9jKfF%2FktVxli95iGyZ3Q%2BFScsn4NVRprSBNrqzXIZsEeeF6uHn%2F7q6E7yY%2Fv6y2eneO7Qb99nP17CJoZhpU%2FlGGGoUbV8OR2XiQzlA1vvhb%2FbNfS57b1JyEBK81OgRPJWgYyWTGmcS1z%2FAed84dTCAwAA&%243p=a_facebook&~campaign=BEWA_12829_adyogi_Sales_Prospect_Web_SPA_Men_6-Feb-2025&~channel=facebook&~feature=paid%20advertising&%24deeplink_path=www.bewakoof.com%2Fhoodies-for-men%3F&utm_source=facebook&utm_medium=cpc&utm_campaign=BEWA_12829_adyogi_Sales_Prospect_Web_SPA_Men_6-Feb-2025&~ad_id=120236559496330385&~ad_set_id=120236378888360385&~campaign_id=120221848925910385&~ad_name=SPA%20%7C%204%20%7C%20Hoodies%20%7C%20Winterwear%20%7C%202-Sep-25&~ad_set_name=Persona_Hoodie_Men_2-Sep-2025&%24ios_passive_deepview=false&%24android_passive_deepview=false&utm_id=120221848925910385&utm_content=120236559496330385&utm_term=120236378888360385&fbclid=PAdGRleAMn8TJleHRuA2FlbQEwAGFkaWQBqyqD3_4KIQGnNqtTkt926R6n5a1IgjmcyiCEsNHgvHbyDHCpPifMATSIkoJCP24B7WW3OTs_aem_lIjzxIbr9rDnPZp4XXuiUw&_branch_match_id=1410321425029299627"
    },
    {
        "name": "Pink Classic Semi Sheer Georgette Relaxed Fit Shirt",
        "image": "http://houseofkoala.com/cdn/shop/files/2_b0c23dda-4bfb-4559-9655-024b40dc2f78.jpg?v=1744105231",
        "url": "https://houseofkoala.com/products/unisex-pink-geo-shirt?utm_content=Facebook_UA&utm_source=meta&variant=50372905468197&media_type=image&utm_medium=cpc&utm_campaign=Sale_HOK_Prospective_Campaign_April25&utm_id=120218783562320239&utm_term=120219230236200239&fbclid=PAdGRleAMpfsZleHRuA2FlbQEwAGFkaWQBqyZ0VAYi7wGnl1vCLk5X-fm0yqxD_ynUrgp1iPefWt6mAhfkOAvfpO40wA2u0YvHHU3PmzA_aem_KS56BtMdXWSs1uus_a9TRg&campaign_id=120218783562320239&ad_id=120221907664550239"
    },
    {
        "name": "Product from www.tistabene.com",
        "image": "https://www.tistabene.com/cdn/shop/files/logo_f6170353-8cab-4819-8366-cb3a3edbf30e.jpg?v=1632492477",
        "url": "https://www.tistabene.com/products/black-dont-believe-in-human-heavyweight-oversized-t-shirt"
    },
    {
        "name": "Jungle Jacquard Hoodie",
        "image": "http://sahlud.in/cdn/shop/files/sah-luv-edit--43.jpg?v=1735369912",
        "url": "https://sahlud.in/products/jungle-jacquard-hoodie?utm_medium=paid&utm_id=120235324847700211&utm_content=120235324847640211&utm_term=120235324847690211&utm_campaign=120235324847700211&fbclid=PAdGRleAMya5tleHRuA2FlbQEwAGFkaWQBqylkJXGY0wGnzt6xwXBk0UChYBYiK5b9IOsx44N4hrxSvvZ1RhTXbCqAqtU-yugFPJvS7Yg_aem_e_AUJwQrNf3FaqJpS9pXGA&utm_source=facebook&campaign_id=120235324847700211&ad_id=120235324847640211"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom2-4.cdninstagram.com/v/t51.71878-15/533246546_1329241532112987_7991381017150309613_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=106&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=6dPKQrF90vAQ7kNvwEuMOC0&_nc_oc=Ado5CPng4Fn-dvYuIesTjAheSW5wTV2T9CIYh1rXwsKGvytWzC_6DsLVGTsnlL0oi5w&_nc_zt=23&_nc_ht=scontent-bom2-4.cdninstagram.com&_nc_gid=8FXA9cJKpmKzeqDZWr2jAw&_nc_ss=7ba8c&oh=00_AQB6OQa6z6LRsgQtr7ElEZqX1qKQPPIp3UGGJ0HNjjZxnA&oe=6A4CC09B",
        "url": "https://www.instagram.com/p/DLbs8-IA1kL/?igsh=MTFrdWNjeDlvZTRrcQ=="
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-1.cdninstagram.com/v/t51.71878-15/539499837_1090253849447363_5475555228413320874_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=SOPqSboYjQgQ7kNvwE_R5nM&_nc_oc=Adqbu4cNmutQa5HVK9mWBpF0GEHst1LuEdPie8_NqB7uLtbFOYx1uuyX9TEDc6L1Hr8&_nc_zt=23&_nc_ht=scontent-bom5-1.cdninstagram.com&_nc_gid=S7CHdl7aZrVTG7oemOiAbA&_nc_ss=7ba8c&oh=00_AQBdFHcMSJ1mvlNWh88glneENN_cacC66F0T0-nzi5cCAA&oe=6A4CBA2A",
        "url": "https://www.instagram.com/p/DNz-s7NQHDJ/?igsh=MXVzNzk5Mng4dXI1cw=="
    },
    {
        "name": "Aesthetic I Love Youu This Much Hoodies",
        "image": "http://cityapparel.in/cdn/shop/files/A02E56E1-D8EB-4CB4-82EC-5D732DF3FFAB.jpg?v=1750172985",
        "url": "https://cityapparel.in/products/aesthetic-i-love-youu-this-muchhoodies?utm_content=Facebook_UA&utm_source=facebook&variant=51261150298412&fbclid=PAdGRleAMzO2dleHRuA2FlbQEwAGFkaWQAVLtyg8rbzgGnbTGGWS9o-afwamlZrgr_GdS3nCUFP1zJEi35IYIgtvRedH57eiPTFrk0ZAA_aem_Yqzqr4tEuhB02PXjlGpy7A&utm_medium=paid&campaign_id=23849862047480798&ad_id=23849862047490798&utm_id=23849862047480798&utm_term=23849862047470798&utm_campaign=23849862047480798"
    },
    {
        "name": "Samurai Jacket | Premium Heavy Gauge Cotton | Mydesignation",
        "image": "http://www.mydesignation.com/cdn/shop/files/samurai-jacket-jacket-mydesignation-4746300.jpg?v=1763446145",
        "url": "https://www.mydesignation.com/products/samurai-jacket?utm_source=meta&utm_medium=cpc&utm_campaign=new-launch&utm_content=samurai-jacket&utm_id=120217820300310158_v2_s04_e280&utm_term=120232262752920158&fbclid=PAdGRleAM0oCFleHRuA2FlbQEwAGFkaWQBqyabXFlCzgGnFYE_UF87A9xiDLZ5hP2Y9P2bR7A8icCMmQuKx5huTk83lUCW_OcfvXZRZWk_aem_82haDPuImVsXwOEkI_5H5w"
    },
    {
        "name": "The Junoon shirt",
        "image": "http://www.charactr.in/cdn/shop/files/edit--m-34.jpg?v=1757066840",
        "url": "https://charactr.co.in/products/the-junoon-shirt?utm_medium=paid&utm_id=120235693509690130&utm_content=120235693530940130&utm_term=120235693509680130&utm_campaign=120235693509690130&fbclid=PAdGRleAM12DpleHRuA2FlbQEwAGFkaWQBqym6AofzkgGnX3YOQzl2WS3bDugP44FmbI88pHObvmU8KoFu6lQbr2DrIpZg-cFLmxHPgHo_aem_6cP2fyn0tziq3bEpndACug&utm_source=facebook&campaign_id=120235693509690130&ad_id=120235693530940130"
    },
    {
        "name": "One Who Rules",
        "image": "http://owr.life/cdn/shop/files/540557278_17843016828564343_317605814584925388_n_f1fa663f-4ade-48b8-bb90-f2775db9afbf.jpg?v=1768323070",
        "url": "https://owr.life/products/who-are-you-t-shirt?utm_medium=paid&utm_id=6874385611332&utm_content=6874385611532&utm_term=6874385612332&utm_campaign=6874385611332&fbclid=PAdGRleAM2KOxleHRuA2FlbQEwAGFkaWQAAAZAlSRk_AGntjtigPx_EwXYEK6h_JBR8eS3hGCjMh_YDE0emksMlmNPECFS4ceVAMucE5c_aem__q4Nv2pkTguDLGsLYwXq1A&utm_source=facebook"
    },
    {
        "name": "Back Griffel Cotton Fleece oversized Hoodie \ud83e\udde2",
        "image": "http://griffel.in/cdn/shop/files/12_3bc7e2e2-d014-4495-b4a7-04d4e072bbaa.jpg?v=1761301930",
        "url": "https://griffel.in/products/griffel-mens-black-front-logo-back-full-griffel-print-oversized-fleece-hoodie-sweatshirt?utm_content=Broad&utm_source=facebook&variant=44616434483422&media_type=image&utm_medium=cpc&utm_campaign=TOF_DABA_All+product_5th+Aug&utm_id=120229918357980031&utm_term=120229918357970031&fbclid=PAdGRleAM9RxVleHRuA2FlbQEwAGFkaWQBqybBVfpxDwGnur-9l2-LR7usA6-6rC6DThxfmqA54ZmWgiUM1glcyVqWiYLL1W4BHcCoxTY_aem_gftq7cIrQ3T9g36wr-agPg&campaign_id=120229918357980031&ad_id=120232331772190031"
    },
    {
        "name": "Product from www.tistabene.com",
        "image": "https://www.tistabene.com/cdn/shop/files/logo_f6170353-8cab-4819-8366-cb3a3edbf30e.jpg?v=1632492477",
        "url": "https://www.tistabene.com/products/deep-blue-tie-and-dye-turtleneck-swt-0028?utm_content=Facebook_UA&utm_source=facebook&variant=41133438206127&utm_medium=paid&utm_id=120215506635550379&utm_term=120215506635530379&utm_campaign=120215506635550379&fbclid=PAdGRleAM-V49leHRuA2FlbQEwAGFkaWQBqyXyMMvdqwGnOTxegBs8Nf1tnjrgwInefv324NpBHtVRNgYxvioPq8Rj535YVWKLbASYDd0_aem_U7mh1kBkb0PAhivcSzcLaA&campaign_id=120215506635550379&ad_id=120215506635540379"
    },
    {
        "name": "Yo B*tch : Breaking Bad Oversized T-shirt",
        "image": "http://velvetnova.in/cdn/shop/files/yo-bitch-white.png?v=1736608036",
        "url": "https://velvetnova.in/collections/2025-featured-collection/products/yo-b-tch-breaking-bad-oversized-t-shirt?utm_source=ig&utm_medium=Instagram_Reels&utm_campaign=11+Sep+Humour+Hip+Hop&utm_content=11+Sep+Humour+Hip+Hop&utm_id=120233086541450118_v2_s65_e14_i20250924&utm_term=120233087057790118&fbclid=PAdGRleANAtv5leHRuA2FlbQEwAGFkaWQBqydbFWz3lgGn1K7ayUDYXp5rtqZugv7HKDMcL7QVgx2scC3dshMuWJsNPmxW5boEZFXCl4g_aem_G6Bdeog9N9hCDhllGUAXmw"
    },
    {
        "name": "Printed Polo T-shirt #735",
        "image": "http://banginclothing.com/cdn/shop/files/3_9752d0b2-ddf5-404a-89e1-71700707e6b3.jpg?v=1741871697",
        "url": "https://banginclothing.com/products/printed-polo-t-shirt-735?utm_medium=paid&utm_id=120228432629950786&utm_content=120228432788650786&utm_term=120228432629940786&utm_campaign=120228432629950786&fbclid=PAdGRleANA1HlleHRuA2FlbQEwAGFkaWQBqyMfZ3nAUgGn_QA-viFGBofLWxqr32IlM8kK4OPqIBkqtgaXdkcy0OKx8KOosYiLwGjDLPo_aem_5gmqXI7iezkmOry-NSb-wA&utm_source=facebook"
    },
    {
        "name": "Bubblegum Bliss Polo",
        "image": "http://www.lavishstripe.in/cdn/shop/files/10_2ee09520-af5e-4065-8fb1-c6c0921acda8.png?v=1752780867",
        "url": "https://www.lavishstripe.in/products/bubblegum-bliss-tee?variant=45228151570622&utm_medium=paid&utm_id=120211293023660482&utm_content=120231731488950482&utm_term=120211293023890482&utm_campaign=120211293023660482&fbclid=PAdGRleANA3l1leHRuA2FlbQEwAGFkaWQBqyYgE_WUYgGnhyzB9krRYEPP5Oa0WBYGYTdcTaaqZDMu0N5FiLqSshywLCqDVMr4z-aC0oQ_aem_6uirQEw5riqnFyoXvrio8A&utm_source=facebook"
    },
    {
        "name": "Jacquard Layers Tee - White",
        "image": "http://driptripstreetwear.com/cdn/shop/files/6EA59A3E-F72A-440F-B8B5-B797E048238A.jpg?v=1747895947",
        "url": "https://driptripstreetwear.com/products/jacquard-layers-tee-white?utm_medium=paid&utm_id=120233654962560360&utm_content=120233654962580360&utm_term=120233654962570360&utm_campaign=120233654962560360&fbclid=PAdGRleANA4TdleHRuA2FlbQEwAGFkaWQBqyffUuSM2AGn5aMS-pqdJo-4yy2pkSvqFdIKdBs2cDrX2F6NNsIk2yUDzq7Gh5Q6_iIngUs_aem_fBlcMfbTq0ePr7pkc4ZA0g&utm_source=facebook"
    },
    {
        "name": "Printed Polo T Shirts for Men \u2013 Stylish Graphic Tees | Juxar",
        "image": "http://www.juxar.com/cdn/shop/collections/dark-green-white-plain_4ef8be3f-9eaa-4216-9f89-547095983420.webp?v=1754113624",
        "url": "https://www.juxar.com/collections/printed-polo-t-shirts?media_type=image&utm_source=printedpolocatalog&utm_medium=paid&utm_id=120228928270190457_v2_s65_e14_i20250924&utm_content=120228928270240457&utm_term=120228928270220457&utm_campaign=120228928270190457&fbclid=PAZXh0bgNhZW0BMABhZGlkAasjrTW3T9kBp9MnP9pjKQH3QukQtnG9mOOu-CaiRkExULd2s2rqr9uBaG3Z9M8geWhVGjuP_aem_Rd525BZGZFy38XPfsM-Lrg&campaign_id=120228928270190457&ad_id=120228928270240457"
    },
    {
        "name": "Alphabets Pink Polo T-Shirt",
        "image": "http://squirehood.com/cdn/shop/files/22_2edcc417-ebbe-4dd2-80f7-b705b3abc445.jpg?v=1770285518",
        "url": "https://squirehood.com/products/alphabets-pink-polo-t-shirt-1?utm_content=Printed+Polo+t-shirts&utm_source=igInstagram_Reels&variant=50427771945240&utm_medium=rcpSRC-TOF+%7C+LLA+8%25&utm_campaign=SRC_TOF+%7C+LLA+6-10%25+%7C+5+Ad+set+%7C+6+Aug&utm_id=120229812254470495&utm_term=120229812254640495&fbclid=PAdGRleANDD-xleHRuA2FlbQEwAGFkaWQBqyYZGIKazwGn82AaLPRFykijXBr3g0GY7GxPHHCrHs-BrWC1sW3M2Kypjt0-fhhLFIwdJWQ_aem_2ObRp6omnEkjW8z0tAPt7g&campaign_id=120229812254470495&ad_id=120229812254510495"
    },
    {
        "name": "The Dragon Tee",
        "image": "http://slaystay.com/cdn/shop/files/DSC04684.jpg?v=1773335945",
        "url": "https://slaystay.com/products/the-dragon-tee?utm_content=22+April+-+Catalogue+-+All+Product+%E2%80%93+Copy&utm_source=facebook&variant=44964750786743&utm_medium=paid&utm_campaign=OD+%7C+Per+AUD+%26+ADS+%7C+12+May&utm_term=INT+01+-+%28Trendy+Shoppers%29+%E2%80%93+Copy&fbadid=120222745026120208&utm_id=120222744839050208&fbclid=PAZXh0bgNhZW0BMABhZGlkAasd8z5lOyABpzKfjHUjGK6NEA5tpRCHjhY6-qQWpzIPtMCB2ybFGBAGvb3fSpzwVGrlrMpM_aem_xG3pJNAVdpfstusFh29tvA&campaign_id=120222744839050208&ad_id=120222745026120208"
    },
    {
        "name": "Buy Men&#x27;s White &amp; Red Iron Man Graphic Printed Oversized Windcheater Jacket Online at Bewakoof",
        "image": "https://images.bewakoof.com/original/men-s-white-red-iron-man-graphic-printed-oversized-windcheater-jacket-642499-1759751766-1.jpg",
        "url": "https://www.bewakoof.com/p/mens-white-red-graphic-printed-oversized-windcheater-jacket?fbclid=PAVERFWANJ6LpleHRuA2FlbQEwAGFkaWQBqyu5yKEtgQGnIyzhWRPwhxIgeizRI0S2n6gRETqByXVz6_NxlnSH28tpzQkF9eTR6is3VqM_aem_4rTssVYCtlq9h3THFyi_6w"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-1.cdninstagram.com/v/t51.71878-15/556072158_1532869944742620_6230379921450327028_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=110&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=1IKO6GKOOGgQ7kNvwEDjEwu&_nc_oc=AdqiDsI52u0MBwzkteo3hmU1brZwAP8WAPFcG7f1limwY_htmUa1biZKESF7iMwQfAU&_nc_zt=23&_nc_ht=scontent-bom5-1.cdninstagram.com&_nc_gid=rp3FxzEvLRu72HNTssVRJw&_nc_ss=7ba8c&oh=00_AQC9KuAYORiXDOpan2P2KpBWdEftFXPPuPIy-2Nq8cKUCg&oe=6A4CAC86",
        "url": "https://www.instagram.com/p/DPJ_RfTDOSS/?igsh=MXRkYmxzaW9kb29jcA=="
    },
    {
        "name": "Acid Trip Drop Shoulder Hoodie",
        "image": "http://urbanpitara.com/cdn/shop/files/e852197a-1d3c-47de-a110-bee44021c26b.webp?v=1768837157",
        "url": "https://urbanpitara.com/products/ninja-turtles-pizza-slice-drop-shoulder-hoodie-copy?utm_content=Instagram_Feed&utm_source=WMOF+-+AS+-+Cat+-+Feb25+Campaign&utm_medium=Cat+In+stock+Ad&utm_campaign=WMOF+-+AS+-+Cat+-+Feb25+Ad+Set&utm_id=120214669804600009&utm_term=120214669804610009&fbclid=PAdGRleANOD6FleHRuA2FlbQEwAGFkaWQBqx43kHUhSQGnA1wQBPJtc5v-ki5fVUwfZ8hel75PZpWnci4oKDANOfk_cjgQjA22C5kloQ4_aem_KamzDM_HAAZH08LaCT889g"
    },
    {
        "name": "Venom Oversized Tshirt | Premium Cotton | Mydesignation",
        "image": "http://www.mydesignation.com/cdn/shop/files/venom-men-oversized-t-shirt-mydesignation-889368.jpg?v=1747807068",
        "url": "https://www.mydesignation.com/products/venom?variant=48587374788916&media_type=image&utm_source=adyogi&utm_medium=ig&utm_campaign=MYDE_15390_adyogi_Conversions_Prospect_Adv%2Bshopping_All_products_2025-120206205121210158&utm_content=3401189+All_instock_products_Revenue_14D&utm_id=120206205121210158_v2_s01_e291_i20251004&utm_term=120227420086160158&fbclid=PAZXh0bgNhZW0BMABhZGlkAask_lDKyK4Bp9CSCuULJQSwkHSGDexBO0l8JzNOwZStVZDwUFvx7Hys9GidEDQNgvfzgAkx_aem_BoT_y6Dsx_XoPV3OlGFzpQ"
    },
    {
        "name": "Jacquard Layers Hoodie",
        "image": "http://driptripstreetwear.com/cdn/shop/files/B7F8EF82-DC8C-4443-849C-FD090D04A633.jpg?v=1732977156",
        "url": "https://driptripstreetwear.com/products/jacquard-layers-hoodie?utm_medium=paid&utm_id=120232621774260621&utm_content=120232621774300621&utm_term=120232621774370621&utm_campaign=120232621774260621&fbclid=PAdGRleANOHMlleHRuA2FlbQEwAGFkaWQBqybuvfzpHQGn_uOF3V702zk1Saa0mE80_sBVs9i05wHJVXg13AKhNDB7JfyVantreHjKN5M_aem_r4T0It6ULPMtl-JtNVb5Fw&utm_source=facebook&campaign_id=120232621774260621&ad_id=120232621774300621"
    },
    {
        "name": "Buy Best Hoodies for men Online in India - Trendy &amp; Stylish",
        "image": "http://www.bonkerscorner.com/cdn/shop/collections/hoodies_M_category_int.jpg?v=1768889267",
        "url": "https://www.bonkerscorner.com/collections/hoodies-for-men"
    },
    {
        "name": "Men's White Graphic Oversized Jacket",
        "image": "http://showoffff.in/cdn/shop/products/J105_White_1.jpg?v=1778348139",
        "url": "https://showoffff.in/products/men-mock-collar-white-typography-tailored-oversized-jacket-j105_white?utm_content=FS_Generic_DPA_BSJuly_210825-Instagram_Reels&utm_source=ig&variant=48309122498836&media_type=image&utm_medium=paid&utm_campaign=FS_Con_ASC_DPA_020525&utm_term=FS_Con_ASC_BSJuly_DPA_210825&utm_id=120221207046310678&fbclid=PAdGRleANTTPNleHRuA2FlbQEwAGFkaWQBqyNzV7kc9gGnX1pIIhULZRazMomCqsJvbPNEv7t5GQwSew2G3xRoE5V58QCRWiuD6Qa48gg_aem_3CJoj1ma3X055SduPbgFjg&campaign_id=120221207046310678&ad_id=120228792611910678"
    },
    {
        "name": "Black Abstract Jacquard Knit Polo T-Shirt",
        "image": "http://www.powerlook.in/cdn/shop/files/1366211_1.jpg?v=1758720666",
        "url": "https://powerlook.in/products/black-abstract-jacquard-knit-polo-sweater?variant=47444449100026&media_type=image&utm_source=facebook&utm_medium=cpc&utm_campaign=DM_TOF_Advantage+_PAYDAY_SALE_offers_01Oct25+-+Copy+%E2%80%93+Copy&utm_content=AD_Catalog_01Oct25+%E2%80%93+Copy+2&utm_id=120236222807090536_v2_s01_e29198&utm_term=120236222807110536&fbclid=PAdGRleANXLQVleHRuA2FlbQEwAGFkaWQBqyqJQhXxSAGnnhxJd1tx_IoEfT-mGSrcV_IrK--XsmNmejrSq8Owm5PsNQ1RM9yBI-0c5M8_aem_sNchc0JxTbYHhHB2t0zPjQ&campaign_id=120236222807090536&ad_id=120236222807060536"
    },
    {
        "name": "Premium T-Shirts",
        "image": "http://veirdo.in/cdn/shop/files/veirdo_logo_d33d25b8-31dd-45c9-9888-d294881e1e2e.svg?v=1686563374",
        "url": "https://veirdo.in/collections/premium-t-shirts?utm_source=adyogi&utm_medium=ig&utm_campaign=CS+%7C+Premium+Tee+%7C+Printed+%7C+PLP+%7C+ASC+%7C+Purchase+%7C+Prospect+%7C+B2@1299+%7C+22-Aug-25-120232440411360684&utm_content=3642962+CS+%7C+Premium+T-shirts+%7C+Printed+%7C+PLP+%7C+Ai+Model+%7C+Static+%7C+195+%7C+B2@1299+%7C+26-Sep-25&utm_id=120232440411360684&utm_term=120232440412690684&fbclid=PAZXh0bgNhZW0BMABhZGlkAasoZrFWyywBp92fT1NyEXCyvqyJw37xMc-0BCSKo2lCbGlylvqLjoLfMdk4S0jjHOYC7vFo_aem_kcDabnD53MTB6tOOvzrDkg&campaign_id=120232440411360684&ad_id=120234236479410684?fbclid=PAVERFWANXa5pleHRuA2FlbQEwAGFkaWQBqyhmsVbLLAGn3Z9PU3IRcLK-rInDfvExz7QEJIqjaUJsaXKW-ouOgt8x2ThLSOMc5gLu8Wg_aem_kcDabnD53MTB6tOOvzrDkg"
    },
    {
        "name": "AQUA PATCH POLO SWEATSHIRT",
        "image": "http://fromthestreets.in/cdn/shop/files/FrontSweat-10.png?v=1760416255",
        "url": "https://fromthestreets.in/products/aqua-patch-polo-sweatshirt?utm_content=Facebook_UA&utm_source=facebook&variant=50658362032426&utm_medium=paid&utm_id=120234181216600789&utm_term=120234181216590789&utm_campaign=120234181216600789&fbclid=PAdGRleANcKohleHRuA2FlbQEwAGFkaWQBqyhZ039gRQGnmAqdsPAxjdLrIqJxI_NtFrMiCk8RquvxwqjT56EUNIj9zZWyJhSNdy8DT5Q_aem_e4bfphTLhK_5glK3ZpUE3g&campaign_id=120234181216600789&ad_id=120234181216610789"
    },
    {
        "name": "KNIGHT HOODIE",
        "image": "http://dillusion.in/cdn/shop/files/Untitled_design_20250805_151322_0000.png?v=1754541076",
        "url": "https://dillusion.in/products/knight-hoodie-1?utm_medium=paid&utm_id=120233514839170043&utm_content=120233514839220043&utm_term=120233514839210043&utm_campaign=120233514839170043&fbclid=PAdGRleANcaQpleHRuA2FlbQEwAGFkaWQBqye-qZEgCwGnBPPO3d5b1knFRXpri1tdMDwTgbbHMfMQGflbNQV7KEnllcti-nDjEKpjkxw_aem_cSLDSDvK5z5RJLoDzhiJGA&utm_source=facebook&campaign_id=120233514839170043&ad_id=120233514839220043"
    },
    {
        "name": "Blue and White Regular fit Striped Full Sleeves Shirt",
        "image": "http://www.powerlook.in/cdn/shop/files/dp11088621.jpg?v=1755940322",
        "url": "https://powerlook.in/products/blue-and-white-regular-fit-striped-full-sleeves-shirt"
    },
    {
        "name": "OVERSIZED T-SHIRTS",
        "image": "http://sixbyeleven.com/cdn/shop/files/OFFICIAL_LOGO_SMALL_f86100a6-a42a-4b00-8f4c-be22533d6e43.jpg?v=1734699803",
        "url": "https://sixbyeleven.com/collections/oversized-t-shirts?utm_medium=paid&utm_id=120234182740640056&utm_content=120234183710830056&utm_term=120234182740660056&utm_campaign=120234182740640056&fbclid=PAdGRleANpNeBleHRuA2FlbQEwAGFkaWQBqyhacXe7yAGnejtMNgugErdWC6BbdGl4iV903OYwGOQwYBXqrhopaw0_ERMmH_IsDKRgx74_aem_0be2I3kkFDKWTjRLSGMI-w&campaign_id=120234182740640056&ad_id=120234183710830056"
    },
    {
        "name": "Product from tigc.in",
        "image": "http://tigc.in/cdn/shop/files/SKYz1_2.png?v=1689339442",
        "url": "https://tigc.in/products/mens-pink-relax-fit-printed-overhead-hooded-sweatshirt-0424-dps-84rx-3-pink-flash?variant=49625944129752&utm_source=meta&utm_medium=Instagram_Feed&utm_campaign=ds_bof_manual_9_web_conv_testing_mix_catalog_250925&utm_content=ds_everything_under_999_with_frame_catalog_plp_031025&Campaign+AdSetName=intrest_menswear_brand_under_999_catalog_with_frame_031025&utm_id=120234466509090530_v2_s04_e310_i20251025&utm_term=120234837931330530&fbclid=PAdGRleANpa2NleHRuA2FlbQEwAGFkaWQBqyj1e8HaIgGnbKLCdF-jCAwi-slxfsd30YouXEZVhCBxy4dYZA0GbiuFcHmGjEY0N4wo4ys_aem_rnYXyn0Fb0lVvcarnrjTYA&campaign_id=120234466509090530&ad_id=120234837931320530"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom2-3.cdninstagram.com/v/t51.71878-15/568648550_805375525740781_4911133109410540905_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=xsMwKqpWndQQ7kNvwGGkS13&_nc_oc=Adp6jX6X_RtgoON4Xyr_uolku5t6m2vuLsu10kc4SZz8f1bIEZ0onOqx7niUXp0C1fY&_nc_zt=23&_nc_ht=scontent-bom2-3.cdninstagram.com&_nc_gid=OLig0zopNIMYAxBBRIvDkQ&_nc_ss=7ba8c&oh=00_AQB0FOnQtpju1ZnihnCwKdtN_GQoIFh2PPdAWfqNlg17CA&oe=6A4C8E37",
        "url": "https://www.instagram.com/p/DQHyz2LAHzI/?igsh=MXBoYnI3YWNldjFseQ=="
    },
    {
        "name": "KNIGHT HOODIE",
        "image": "http://dillusion.in/cdn/shop/files/Untitled_design_20250805_151322_0000.png?v=1754541076",
        "url": "https://dillusion.in/products/knight-hoodie-1?variant=51153692426541"
    },
    {
        "name": "The Dragon Tee",
        "image": "http://slaystay.com/cdn/shop/files/DSC04684.jpg?v=1773335945",
        "url": "https://slaystay.com/products/the-dragon-tee?utm_source=facebook&utm_medium=cpc&utm_campaign=9D+%7C+Per+AUD+%26+ADS+%7C+10+5%25off+%7C++16+Oct&utm_term=LAL+5%25&utm_content=16+Oct++-+The+Dragon+Tee+-+Video+%E2%80%93+10+5%25+Diwali+caption+-+Copy&fbadid=120232442554650208&utm_id=120232439350250208&fbclid=PAdGRleANqdvJleHRuA2FlbQEwAGFkaWQBqycw7ZTfEAGnB6A7WrDM3C2gRwocFaCFr2qjLd4G5eYk5nkX3o5WbJhc1QwDeqlFTvrAW8o_aem_6i1CLN9L1okNHoz_9zcp8w&campaign_id=120232439350250208&ad_id=120232442554650208"
    },
    {
        "name": "Product from classtrend.in",
        "image": "https://via.placeholder.com/300x400?text=Failed+to+load",
        "url": "https://classtrend.in/collections/winter-collection?utm_source=ig&utm_medium=Instagram_Reels&utm_campaign=11-11+%7C%7C+Winter+Collection+%7C%7C+CL&utm_content=11-11+%7C%7C+Winter+Collection+%7C%7C+AD&utm_term=11-11+%7C%7C+Winter+Collection+%7C%7C+AS&utm_id=120235656286180760&fbclid=PAdGRleAOFKw5leHRuA2FlbQEwAGFkaWQBqymzMI40OHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAhjYWxsc2l0ZQEzAAGnDlwu4qd1D9aGzzl7Xd4CDsISfvhLD7xV_zOHD09iZXF6bjMIIlEP2jPiQlw_aem_Ra8B-KaOxn0l71dVBM3TeQ&campaign_id=120235656286180760&ad_id=120235656286200760"
    },
    {
        "name": "Shop Stylish Men\u2019s Shirts Online \u2013 Designed for the Modern Indian Man",
        "image": "https://thejanta.com/cdn/shop/files/payment-footer.svg?v=1753865400&width=360",
        "url": "https://thejanta.com/products/men-s-beige-doodle-with-bold-navy-abstract-pattern-printed-shirt?utm_medium=paid&utm_id=120235164474410507&utm_content=120235164474400507&utm_term=120235164474420507&utm_campaign=120235164474410507&fbclid=PAdGRleAOG9d9leHRuA2FlbQEwAGFkaWQBqyk-2Qrii3NydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAhjYWxsc2l0ZQEzAAGnLewJFJjIGQMrR5fQJgOZlQEr2BAGJqdeOndG6jJItK8pCw9kCc67UZ30CVo_aem_fb0IhtSfdTMV8fKdlCjfkg&utm_source=facebook"
    },
    {
        "name": "Joggers (Unisex)",
        "image": "https://wtflex.in/cdn/shop/files/COTTON_PANTS_WEBSITE_BANNER_jpg.jpg?v=1778766614&width=3840",
        "url": "https://wtflex.in/collections/cotton-pants?utm_source=ig&utm_medium=120241802913060779&utm_campaign=120241548983290779&Audience=New_Audience&utm_id=120241802913060779_v2_s01_e36_i20251119&utm_content=120241802913070779&utm_term=120241802913060779&fbclid=PAdGRleAOLjp5leHRuA2FlbQEwAGFkaWQBqy9IaWDtS3NydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpw45MFEi3du3aLLh74MBwcqOKsWxoHfUSTQQ6wFDtExggHaNYEEE9alDdBHF_aem_1bZ9vJDR8TS2uzxb9Xa1Sg&campaign_id=120241548983290779&ad_id=120241802913070779"
    },
    {
        "name": "Instagram",
        "image": "https://scontent-bom5-1.cdninstagram.com/v/t51.71878-15/635414446_2182562598942655_8817234885242711421_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=111&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQUQuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=_JLMzPSzcBIQ7kNvwHhFzcX&_nc_oc=AdqUgrBdmuyjR2JGqUDytSUQtpOwj3-egGgFGycOW6jwlDJtqrKMAJZOM-Iji9a31GY&_nc_zt=23&_nc_ht=scontent-bom5-1.cdninstagram.com&_nc_gid=ACCma6zApVgSMG16oRtMcA&_nc_ss=7ba8c&oh=00_AQCYwpEfvLFO959JuHySdsxVVSEjnDcmSTsTZK49uLXZIA&oe=6A4CB926",
        "url": "https://www.instagram.com/p/DRmLXORjK_K/?igsh=OGlwdWRzb3Npazh2"
    },
    {
        "name": "Unseen Symbols Sweatshirt",
        "image": "http://owr.life/cdn/shop/files/DSC03461_d200bb3a-9a7c-4349-af11-cd43a1516e86.jpg?v=1768295773",
        "url": "https://owr.life/products/unseen-symbols-sweatshirt?utm_medium=paid&utm_id=6774080979532&utm_content=6914036242132&utm_term=6914036241932&utm_campaign=6774080979532&fbclid=PAdGRleAOyfyhleHRuA2FlbQEwAGFkaWQAAAZJzTj-lHNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpx-dgs2HO8qFQWSr4-wNExbWqUxfxazft-3GzB8tXR36OCCl6FlLBAjvG37U_aem_Pa-9o9CLjmiZ0P89kuF_2Q&utm_source=facebook&campaign_id=6774080979532&ad_id=6914036242132"
    },
    {
        "name": "Hoodie",
        "image": "https://cdn.shopify.com/s/files/1/0693/7215/0016/files/004-warrior-world-shark-tank-banner-clp-12-FEB-1_1.png?v=1770900578",
        "url": "https://warriorworld.in/collections/hoodie?audience=%7B%7Baudience.type%7D%7D&utm_source=meta&utm_medium=Instagram_Reels&utm_campaign=ds_tof23_web_conv_hoodie_creatives&utm_content=ds_hoodie_typo_static1_111225&Campaign+AdSetName=open5_india_creatives_111225&utm_id=120239769938700679_v2_s52_e39_i20260104&utm_term=120239769938700679&fbclid=PAdGRleAPHsYlleHRuA2FlbQEwAGFkaWQBqy17O-_Ud3NydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp_M8nddnPE2Sok3-UYt01hdiVZ5kttsHtz5WR-mPuAWXS1E0sRsjl-h2Jema_aem_cFmSLGTXNqoe1-FkM9sJwg&campaign_id=120217344260010679&ad_id=120239769938690679"
    },
    {
        "name": "WHITE NIGHTWING HOODIE",
        "image": "http://gryape.com/cdn/shop/files/nightwing_white2.jpg?v=1759561448",
        "url": "https://gryape.com/collections/new-drops/products/white-nightwing-hoodie"
    },
    {
        "name": "Dopamine State",
        "image": "http://raoco.in/cdn/shop/files/back_2_1.png?v=1767726085",
        "url": "https://raoco.in/products/dopamine-state?utm_content=Facebook_UA&utm_source=fbads&variant=45818705051833&media_type=image&utm_medium=targeted&utm_campaign=Catalogue&utm_id=120238800778810142&utm_term=120238800778820142&fbclid=PAdGRleAP1u45leHRuA2FlbQEwAGFkaWQBqyyQ3CWvbnNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp2sXsYwAaG5-g9b1kLOUFXcgo-4gUq2aqeHuyf7yswaRJKanjNYDQBy5aX1V_aem_z7K99djC6xw_ZaUtCY8BEQ&campaign_id=120238800778810142&ad_id=120238800778830142"
    },
    {
        "name": "The Origin '25",
        "image": "http://ravure.in/cdn/shop/collections/pexels-julietberdo-14441602_ee249bf1-1356-4638-a82a-657b0b9149d1.jpg?v=1776071671",
        "url": "https://ravure.in/collections/theorigin25?utm_medium=paid&utm_id=120239655795840412&utm_content=120240979599800412&utm_term=120240979599780412&utm_campaign=120239655795840412&fbclid=PAdGRleAQgephleHRuA2FlbQEwAGFkaWQBqy7oEqL27HNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp-8FuYwtGmEQwn9zgfSImGdSHwLOixc6DLi02M1g9lAQGbHiXy6u4gN5NobO_aem_H6qyIdWHR2tNXLzqUlA8-A&utm_source=facebook&campaign_id=120239655795840412&ad_id=120240979599800412"
    },
    {
        "name": "Shop All",
        "image": "http://oniisaab.com/cdn/shop/collections/Logo.png?v=1772292877",
        "url": "https://oniisaab.com/collections/shop-all?ad_id=23852819656770097&campaign_id=23852819656430097&fbclid=PAdGRleAQh92JleHRuA2FlbQEwAGFkaWQBqywecqUyYnNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp-18XjedPMEG_dqW0pS7izatuhOPgemhE6Un9u5Fx9MPprZyv6zS2LZcz1L7_aem_LtMMigI-yfhzq9f2TzZBhw&media_type=image&utm_campaign=Advantage+%20shopping%20campaign%2003/02/2023%20Campaign&utm_content=Advantage+%20shopping%20campaign%20V1&utm_id=23852819656430097&utm_medium=paid-social&utm_source=ig&utm_term=23852819656480097"
    },
    {
        "name": "Sanewild TRACE Contrast-Line Relaxed Joggers",
        "image": "http://sanewild.com/cdn/shop/files/Untitled_design_9_9c653e75-75f2-47cb-a40f-898c58754a2f.png?v=1779293324",
        "url": "https://sanewild.com/products/relaxed-fit-contrast-lined-joggers?utm_source=ig&utm_medium=Instagram_Feed&utm_campaign=52504293461553&utm_id=52504293461553&utm_content=52504326311953&utm_term=52504326312153&fbclid=PAdGRleASiImFleHRuA2FlbQEwAGFkaWQAAC_AniR6wXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABp-Ajuo-AKe5QQzbuSa4PFWHQ2o517bFukpv8X9iE0O3Z7_jHMTRyzKX3aS57_aem_RvQENZg2xD0ZCcdTn2eNOg&campaign_id=52504293461553&ad_id=52504326311953"
    },
    {
        "name": "Short Kurtas",
        "image": "https://huesfab.com/cdn/shop/files/CATEGORY_PAGE_BANNER_-_DESKTOP.webp?v=1775473183&width=1362",
        "url": "https://huesfab.com/collections/short-kurtas?utm_source=Facebook_Ads&utm_medium=Instagram_Reels&utm_campaign=NM_Audience+Test_27/05/26&utm_content=NM_Short+Kurta_CC22+Huesfab+short+kurta&utm_term=NM_Winning+Interest+Clubbed&utm_id=120244654635630657&fbclid=PAdGRleASpEf9leHRuA2FlbQEwAGFkaWQBqzKyh8XjwXNydGMGYXBwX2lkDzEyNDAyNDU3NDI4NzQxNAABpy22VW1LOpuhCgz9YS0avHW8KbXhJcSRcrMHD9jvrCHS7SuByUDHqpOsW5E8_aem_z9MGEGcL4xQGFJ9C0VKiaQ&campaign_id=120244654635630657&ad_id=120245555680770657"
    },
    {
        "name": "THE LAST SUNFLOWER T SHIRT",
        "image": "http://www.daastaan.co/cdn/shop/files/21_cb09fde3-ea26-48a5-add2-90e8787f59f8.jpg?v=1779806415",
        "url": "https://www.daastaan.co/products/the-last-sunflower?utm_medium=paid&utm_id=120246673655540515&utm_content=120246673655550515&utm_term=120246673655560515&utm_campaign=120246673655540515&fbclid=PAdGRleASzqvJwZG9mAmZkaWQWUJz_NsDozlimjZeRufWAO1rggbcEvGV4dG4DYWVtATAAYWRpZAGrM7aBRmuzc3J0YwZhcHBfaWQPMTI0MDI0NTc0Mjg3NDE0AAGn4BTVqW7mAxhy0GyfmCltZV97Fun-9ybJ8VYXRBC4FmMMt2lR6BFI66-DiBM_aem_OOT9sPtZ6-grhs-lbZ3D5Q&utm_source=facebook&campaign_id=120246673655540515&ad_id=120246673655550515"
    }
];

    function getDomain(url) {
        try {
            const { hostname } = new URL(url);
            return hostname.replace('www.', '');
        } catch (e) {
            return 'External Store';
        }
    }

    function renderCard(product) {
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
                <img src="${product.image}" alt="${safeName}" class="card-img" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Image+Unavailable'; this.classList.add('error');">
            </div>
            <div class="card-content">
                <h2 class="card-title">${product.name}</h2>
                <span class="card-domain">${domain}</span>
            </div>
        `;
        return card;
    }

    loading.style.display = 'none';
    if (products.length === 0) {
        gallery.innerHTML = '<p style="text-align:center; color: var(--text-secondary); grid-column: 1/-1;">No products found.</p>';
        return;
    }
    
    products.forEach(product => {
        const card = renderCard(product);
        gallery.appendChild(card);
    });
    
    // Add staggered animation
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
});
