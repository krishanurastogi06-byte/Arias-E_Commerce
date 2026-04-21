export const categories = [
  {
    id: 1,
    title: "Elegant Dresses",
    label: "Evening & Party Wear",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop",
    category: "Dresses"
  },
  {
    id: 2,
    title: "Chic Tops",
    label: "Everyday Essentials",
    image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=800&auto=format&fit=crop",
    category: "Tops"
  },
  {
    id: 3,
    title: "Ethnic Wear",
    label: "Traditional Elegance",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    category: "Ethnic Wear"
  },
  {
    id: 4,
    title: "Winter Luxe",
    label: "Warm & Stylish",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    category: "Winter Wear"
  },
  {
    id: 5,
    title: "Accessories",
    label: "The Final Touch",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
    category: "Accessories"
  },
  {
    id: 6,
    title: "Statement Footwear",
    label: "Step in Style",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    category: "Footwear"
  },
];

export const brands = [
  { id: 1, name: "Zara", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg" },
  { id: 2, name: "H&M", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg" },
  { id: 3, name: "Gucci", logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/1960s_Gucci_Logo.svg" },
  { id: 4, name: "Prada", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Prada-Logo.svg" },
  { id: 5, name: "Chanel", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Chanel_logo_interlocking_cs.svg/1280px-Chanel_logo_interlocking_cs.svg.png" },
  { id: 6, name: "Dior", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Dior_Logo.svg/1280px-Dior_Logo.svg.png" },
];

export const products = [
  {
    id: 1,
    slug: "silk-wrap-evening-gown",
    title: "Silk Wrap Evening Gown",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=800&auto=format&fit=crop",
    price: 249.99,
    oldPrice: 350.00,
    rating: 4.8,
    reviewCount: 124,
    category: "Dresses",
    brand: "ARIA Exclusive",
    isNewArrival: true,
    isPopular: true,
    discount: "30% OFF",
    description: "Draped in the finest pure silk, this wrap gown is the ultimate statement for evening occasions. The fluid silhouette flatters every figure with an adjustable tie waist, deep V-neckline, and a graceful floor-length hem. Available in rich jewel tones, it transitions effortlessly from black-tie galas to intimate dinners.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Black", "Emerald Green", "Deep Ruby"],
    material: "100% Pure Silk",
    fit: "Relaxed wrap silhouette, true to size",
    care: "Dry clean only. Store hanging.",
  },
  {
    id: 2,
    slug: "cashmere-turtleneck-sweater",
    title: "Cashmere Turtleneck Sweater",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    price: 129.50,
    oldPrice: 180.00,
    rating: 4.9,
    reviewCount: 218,
    category: "Winter Wear",
    brand: "Luxe Knit",
    isNewArrival: true,
    isPopular: false,
    discount: "28% OFF",
    description: "Luxuriously soft, this turtleneck is crafted from 100% Grade-A Mongolian cashmere. With a fine-gauge knit and a relaxed oversized silhouette, it provides unmatched warmth without sacrificing style. Perfect layered over trousers or styled with a midi skirt.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Ivory", "Camel", "Charcoal Grey"],
    material: "100% Grade-A Mongolian Cashmere",
    fit: "Oversized — size down for a fitted look",
    care: "Hand wash cold. Lay flat to dry.",
  },
  {
    id: 3,
    slug: "high-waist-tailored-trousers",
    title: "High-Waist Tailored Trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop",
    price: 89.00,
    oldPrice: 120.00,
    rating: 4.7,
    reviewCount: 93,
    category: "Tops",
    brand: "Office Chic",
    isNewArrival: false,
    isPopular: true,
    discount: "25% OFF",
    description: "These precision-cut high-waist trousers are your new office-to-evening staple. Featuring a wide-leg silhouette, concealed zip fastening, and a subtle crease detail, they pair seamlessly with blazers, blouses, or cropped knits. Crafted from a premium stretch-wool blend for all-day comfort.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Jet Black", "Warm Beige", "Navy Blue"],
    material: "70% Wool, 25% Polyester, 5% Elastane",
    fit: "High-waist, wide-leg — true to size",
    care: "Dry clean recommended. Iron on low.",
  },
  {
    id: 4,
    slug: "floral-embroidery-saree",
    title: "Floral Embroidery Saree",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
    price: 199.00,
    oldPrice: 299.00,
    rating: 4.9,
    reviewCount: 176,
    category: "Ethnic Wear",
    brand: "Tradition Luxe",
    isNewArrival: true,
    isPopular: true,
    discount: "33% OFF",
    description: "A masterpiece of artisan craftsmanship, this saree features intricate hand-embroidered floral motifs on a lightweight georgette base. The delicate threadwork and sequin accents make it ideal for weddings, festivals, and celebrations. Comes with a matching unstitched blouse piece.",
    sizes: ["Free Size (5.5m + 0.8m blouse)"],
    colors: ["Blush Pink", "Turquoise", "Canary Yellow"],
    material: "Pure Georgette with Zari & Sequin embroidery",
    fit: "One size — 5.5 metres saree + 0.8m blouse piece",
    care: "Dry clean only. Do not wring.",
  },
  {
    id: 5,
    slug: "premium-leather-crossbody-bag",
    title: "Premium Leather Crossbody Bag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    price: 159.99,
    oldPrice: 210.00,
    rating: 4.8,
    reviewCount: 312,
    category: "Accessories",
    brand: "Boutique",
    isNewArrival: false,
    isPopular: true,
    discount: "24% OFF",
    description: "Handcrafted from full-grain Italian leather, this crossbody bag combines timeless elegance with modern function. Features a secure magnetic snap closure, adjustable chain-and-leather strap, a suede-lined interior, and two slip pockets. The perfect companion from morning meetings to evening outings.",
    sizes: ["One Size (22cm × 16cm × 6cm)"],
    colors: ["Cognac Brown", "Classic Black", "Dusty Rose"],
    material: "Full-grain Italian leather, suede interior lining",
    fit: "Compact crossbody — fits phone, wallet, keys, and essentials",
    care: "Wipe with dry cloth. Use leather conditioner monthly.",
  },
  {
    id: 6,
    slug: "linen-button-up-blouse",
    title: "Linen Button-Up Blouse",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop",
    price: 65.00,
    oldPrice: 85.00,
    rating: 4.6,
    reviewCount: 57,
    category: "Tops",
    brand: "Summer Breeze",
    isNewArrival: true,
    isPopular: false,
    discount: "23% OFF",
    description: "Effortlessly chic and breathable, this linen button-up blouse is your summer essential. Featuring a relaxed boxy fit, curved hem, and pearlescent shell buttons, it works as well tucked into tailored trousers as it does worn open over a swimsuit. Wrinkles are a feature, not a flaw.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Off White", "Sky Blue", "Sage Green"],
    material: "100% European Linen",
    fit: "Boxy relaxed fit — size down for a fitted look",
    care: "Machine wash cold. Tumble dry low.",
  },
  {
    id: 7,
    slug: "pointed-toe-stiletto-heels",
    title: "Pointed Toe Stiletto Heels",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop",
    price: 110.00,
    oldPrice: 150.00,
    rating: 4.7,
    reviewCount: 144,
    category: "Footwear",
    brand: "Step Up",
    isNewArrival: false,
    isPopular: true,
    discount: "26% OFF",
    description: "A wardrobe cornerstone, these pointed-toe stilettos are designed to elevate any outfit. The 10cm stiletto heel is reinforced for stability, while the padded insole ensures you can wear them all night. Available in classic patent leather and satin finishes.",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: ["Patent Black", "Nude Blush", "Cherry Red"],
    material: "Patent leather upper, leather lining, leather sole",
    fit: "True to size. Wide-foot wearers: size up half a size.",
    care: "Wipe with Patent leather cloth. Store in dust bag.",
  },
  {
    id: 8,
    slug: "classic-trench-coat",
    title: "Classic Trench Coat",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    price: 189.00,
    oldPrice: 240.00,
    rating: 4.9,
    reviewCount: 289,
    category: "Winter Wear",
    brand: "Vogue",
    isNewArrival: true,
    isPopular: true,
    discount: "21% OFF",
    description: "The definitive trench coat, reimagined for the modern woman. This knee-length silhouette features the iconic double-breasted front, storm flap, epaulettes, and a belted waist. Crafted from a water-resistant cotton-gabardine and fully lined in smooth satin for a polished, timeless finish.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Classic Camel", "Stone Beige", "Noir Black"],
    material: "100% Cotton-Gabardine (water-resistant), satin lining",
    fit: "Classic fit — accommodates a light layer underneath",
    care: "Dry clean only. Steam to remove creases.",
  },
  {
    id: 9,
    slug: "velvet-party-dress",
    title: "Velvet Party Dress",
    image: "https://img.freepik.com/premium-photo/women-elegant-party-evening-dress-velvet-sexy-sequin-sleeveless-summer-dress_202454-2016.jpg?semt=ais_hybrid&w=740&q=80",
    price: 175.00,
    oldPrice: 220.00,
    rating: 4.8,
    reviewCount: 198,
    category: "Dresses",
    brand: "Night Out",
    isNewArrival: true,
    isPopular: false,
    discount: "20% OFF",
    description: "Turn heads in this body-skimming velvet mini dress. The rich crushed velvet fabric catches light beautifully, while the sleeveless silhouette and invisible back zip keep the look sleek and modern. Perfect for cocktail parties, dinners, and everything in between.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Midnight Navy", "Burgundy", "Forest Green"],
    material: "90% Polyester Velvet, 10% Elastane",
    fit: "Fitted — true to size",
    care: "Dry clean only. Do not iron directly on velvet.",
  },
  {
    id: 10,
    slug: "boho-maxi-skirt",
    title: "Boho Maxi Skirt",
    image: "https://images.unsplash.com/photo-1582142306909-195724d33ffc?q=80&w=800&auto=format&fit=crop",
    price: 55.00,
    oldPrice: 75.00,
    rating: 4.5,
    reviewCount: 61,
    category: "Tops",
    brand: "Free Spirit",
    isNewArrival: false,
    isPopular: false,
    discount: "26% OFF",
    description: "Channel your inner free spirit with this breezy tiered maxi skirt. Crafted from lightweight crinkled cotton, it features an elasticated waist, subtle floral print, and a fluid silhouette that moves beautifully. Style it with a tucked-in white tee, strappy sandals, and a straw hat for the perfect summer look.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Terracotta Floral", "Indigo Blue", "Lemon Yellow"],
    material: "100% Crinkled Cotton",
    fit: "Relaxed fit — elasticated waist fits a range of sizes",
    care: "Machine wash cold. Air dry.",
  },
  {
    id: 11,
    slug: "anarkali-suit-set",
    title: "Anarkali Suit Set",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    price: 210.00,
    oldPrice: 300.00,
    rating: 4.9,
    reviewCount: 203,
    category: "Ethnic Wear",
    brand: "Heritage",
    isNewArrival: false,
    isPopular: true,
    discount: "30% OFF",
    description: "A celebration of Indian heritage, this Anarkali suit set features a floor-sweeping kurta with hand-block printed motifs, paired with churidar leggings and a matching dupatta. The rich chanderi silk fabric and contrast border make it a showstopper for festive occasions and family functions.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Royal Blue", "Crimson Red", "Olive Gold"],
    material: "Chanderi Silk kurta, Cotton churidar, Chiffon dupatta",
    fit: "Semi-fitted — refer to size chart for accurate measurement",
    care: "Gentle hand wash separately. Do not bleach.",
  },
  {
    id: 12,
    slug: "gold-plated-statement-necklace",
    title: "Gold-Plated Statement Necklace",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
    price: 45.00,
    oldPrice: 65.00,
    rating: 4.7,
    reviewCount: 88,
    category: "Accessories",
    brand: "Glow",
    isNewArrival: true,
    isPopular: false,
    discount: "30% OFF",
    description: "Make a statement with this 18K gold-plated layered necklace featuring a mix of delicate chains and a bold pendant centerpiece. Hypoallergenic and tarnish-resistant, it's designed to be worn every day or to complete your most glamorous evening look. Arrives in a luxury gift box.",
    sizes: ["One Size (adjustable 40–45cm)"],
    colors: ["18K Gold", "Rose Gold", "Silver"],
    material: "Brass base, 18K gold plating, hypoallergenic",
    fit: "Adjustable chain length — 40cm to 45cm",
    care: "Wipe with soft cloth. Store in pouch away from moisture.",
  },
  {
    id: 13,
    slug: "oversized-woolen-blazer",
    title: "Oversized Woolen Blazer",
    image: "https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b3ZlcmNvYXR8ZW58MHx8MHx8fDA%3D",
    price: 145.00,
    oldPrice: 200.00,
    rating: 4.8,
    reviewCount: 167,
    category: "Winter Wear",
    brand: "Urban Luxe",
    isNewArrival: true,
    isPopular: true,
    discount: "27% OFF",
    description: "This season's most versatile piece — an oversized double-breasted blazer in a premium Italian wool blend. Wear it belted as a dress, open over a slip dress, or buttoned-up over trousers. The sharp lapels, padded shoulders, and clean seams give it a powerful, polished silhouette.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Chalk White", "Camel", "Charcoal"],
    material: "80% Wool, 20% Polyamide",
    fit: "Oversized — size down for a more tailored look",
    care: "Dry clean only. Store on a wide shoulder hanger.",
  },
  {
    id: 14,
    slug: "block-heel-sandals",
    title: "Block Heel Sandals",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop",
    price: 95.00,
    oldPrice: 130.00,
    rating: 4.6,
    reviewCount: 79,
    category: "Footwear",
    brand: "Comfy Step",
    isNewArrival: false,
    isPopular: true,
    discount: "27% OFF",
    description: "Comfort meets elegance in these 7cm block heel sandals. The wide toe strap with a gold buckle closure, cushioned leather footbed, and sturdy heel make these an all-day wearable option that doesn't compromise on style. Goes beautifully with everything from summer dresses to wide-leg trousers.",
    sizes: ["35", "36", "37", "38", "39", "40", "41"],
    colors: ["Tan Brown", "Nude", "White"],
    material: "Genuine leather upper and lining, rubber sole",
    fit: "True to size",
    care: "Clean with leather wipe. Condition regularly.",
  },
  {
    id: 15,
    slug: "satin-slip-dress",
    title: "Satin Slip Dress",
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=800&auto=format&fit=crop",
    price: 130.00,
    oldPrice: 180.00,
    rating: 4.7,
    reviewCount: 241,
    category: "Dresses",
    brand: "ARIA Exclusive",
    isNewArrival: false,
    isPopular: true,
    discount: "28% OFF",
    description: "Effortlessly sensual and versatile, this bias-cut satin slip dress flatters every curve with a cowl neckline, adjustable spaghetti straps, and a fluid midi length. Wear it alone with heeled mules for evening, or layer over a white tee for a relaxed daytime look. A true wardrobe investment.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Champagne Gold", "Dusty Mauve", "Smoke Blue"],
    material: "100% Polyester Satin (silk-like finish)",
    fit: "Bias-cut for a body-skimming fit — size up if between sizes",
    care: "Hand wash cold or gentle machine wash. Hang to dry.",
  },
  {
    id: 16,
    slug: "embroidered-clutch-bag",
    title: "Embroidered Clutch Bag",
    image: "https://images.unsplash.com/photo-1591561954555-607968c989ab?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhhbmRiYWdzfGVufDB8fDB8fHww",
    price: 75.00,
    oldPrice: 110.00,
    rating: 4.8,
    reviewCount: 136,
    category: "Accessories",
    brand: "Crafted",
    isNewArrival: true,
    isPopular: true,
    discount: "32% OFF",
    description: "A hand-embroidered evening clutch that tells a story. Artisans use traditional zardozi embroidery techniques to create the intricate floral pattern on this structured minaudière. Features a magnetic snap closure, a detachable satin wrist loop, and a fully lined interior with a mirror pocket.",
    sizes: ["One Size (20cm × 12cm)"],
    colors: ["Gold on Black", "Silver on Navy", "Gold on Ivory"],
    material: "Velvet exterior with zardozi embroidery, satin lining",
    fit: "Compact evening clutch — fits phone, cards, lipstick",
    care: "Spot clean only. Store in dust bag.",
  },
];

export const looks = [
  {
    id: 1,
    season: 'Spring / Summer',
    title: 'Golden Hour',
    subtitle: 'Where silk meets sunset.',
    description: 'Effortless luxury for long evenings — flowing silhouettes, sun-kissed fabrics, and an ease that moves with you.',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-amber-900/70',
    products: [1, 15, 6], // slugs by id
  },
  {
    id: 2,
    season: 'Autumn / Winter',
    title: 'Quiet Luxury',
    subtitle: 'The power of understatement.',
    description: 'Cashmere, wool, and muted tones — a wardrobe built on quality that whispers confidence in every room.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-stone-900/70',
    products: [2, 8, 13],
  },
  {
    id: 3,
    season: 'Festive',
    title: 'Celebration',
    subtitle: 'Dressed for every occasion.',
    description: 'From intimate dinners to grand galas — our festive edit is a symphony of embroidery, velvet, and artisan craft.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-violet-900/70',
    products: [4, 9, 11],
  },
  {
    id: 4,
    season: 'Resort',
    title: 'Riviera Edit',
    subtitle: 'Sun, style, and ease.',
    description: 'Inspired by the Mediterranean coast — breezy linens, statement sandals, and accessories that catch the light.',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop',
    accent: 'from-sky-900/70',
    products: [6, 14, 10],
  },
];

export const editorial = [
  { src: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop', span: 'row-span-2', label: 'Timeless' },
  { src: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?q=80&w=800&auto=format&fit=crop', span: '', label: 'Effortless' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop', span: '', label: 'Bold' },
  { src: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=800&auto=format&fit=crop', span: 'col-span-2', label: 'Statement' },
];

export const blogs = [
  {
    id: 1,
    slug: "art-of-capsule-wardrobes",
    title: "The Art of Capsule Wardrobes: Minimalism Meets Luxury",
    category: "Style Guide",
    date: "April 10, 2024",
    author: "Elena Rossi",
    excerpt: "Discover how to curate a timeless collection of essentials that speak volumes without saying a word. Quality over quantity is the new luxury.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>In a world of fast fashion, the concept of a capsule wardrobe has emerged as the ultimate expression of sophisticated minimalism. At ARIA, we believe that true luxury lies in the quality of every thread and the versatility of every silhouette.</p>
      
      <h3>What is a Capsule Wardrobe?</h3>
      <p>A capsule wardrobe is a curated collection of essential items that don't go out of style and can be augmented with seasonal pieces. The goal? To have a closet full of clothes you love and that fit you perfectly.</p>
      
      <blockquote>"Minimalism isn't about having less; it's about making room for more of what matters."</blockquote>
      
      <h3>The Foundation Pieces</h3>
      <p>To start your ARIA capsule collection, focus on these five pillars:</p>
      <ul>
        <li>The Perfect White Silk Blouse</li>
        <li>Tailored High-Waist Trousers</li>
        <li>A Classic Trench Coat</li>
        <li>The Little Black Silk Dress</li>
        <li>Cashmere Knitwear in Neutral Tones</li>
      </ul>
      
      <p>By investing in these high-quality foundations, you create a canvas for endless styling possibilities. Stay tuned as we dive deeper into each category in the coming weeks.</p>
    `
  },
  {
    id: 2,
    slug: "summer-linen-revolution",
    title: "Summer 2024: The Linen Revolution",
    category: "Trends",
    date: "April 12, 2024",
    author: "Marco Valli",
    excerpt: "Breezy, breathable, and beautifully textured. Explore why linen is the undisputed protagonist of this summer's most elegant looks.",
    image: "https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>Linen is more than just a fabric; it's a summer state of mind. As temperatures rise, the demand for effortless elegance grows, and nothing answers the call quite like European linen.</p>
      
      <h3>The ARIA Linen Edit</h3>
      <p>This season, we've reimagined linen with structural precision. From boxy button-ups to flowing maxi skirts, our linen collection is designed to be worn from dawn till dusk.</p>
      
      <p>Why choose linen?</p>
      <ul>
        <li><strong>Breathability:</strong> Its natural hollow fibers allow air to circulate freely.</li>
        <li><strong>Durability:</strong> Linen is one of the strongest natural fibers, getting softer with every wash.</li>
        <li><strong>Sustainability:</strong> Flax requires significantly less water and pesticides than cotton.</li>
      </ul>
      
      <p>Embrace the natural texture. At ARIA, we believe the subtle wrinkles in linen tell a story of a day well-spent in the sun.</p>
    `
  },
  {
    id: 3,
    slug: "sustainable-silks-choice",
    title: "Sustainable Silks: Why Fabric Choice Matters",
    category: "Sustainability",
    date: "April 14, 2024",
    author: "Sofia Chen",
    excerpt: "Luxury shouldn't come at a cost to the planet. Deep dive into the world of ethically sourced silk and ARIA's commitment to the environment.",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>At ARIA, we believe that the touch of silk against skin is one of life's greatest pleasures. However, we also recognize the responsibility that comes with using such a precious material.</p>
      
      <h3>The Journey of ARIA Silk</h3>
      <p>Our silk is sourced from family-run farms that prioritize biological diversity and ethical labor practices. We use low-impact dyes and closed-loop water systems to ensure our footprint is as light as the fabric itself.</p>
      
      <p>Sustainable silk isn't just better for the Earth; it's better for you. Without harsh chemical treatments, the natural proteins in silk remain intact, providing superior thermal regulation and a softer drape.</p>
      
      <h3>Taking Care of Your Silk</h3>
      <p>Longevity is the cornerstone of sustainability. To ensure your ARIA silk pieces last for decades, we recommend:</p>
      <ul>
        <li>Hand washing cold with pH-neutral detergent.</li>
        <li>Steaming instead of ironing.</li>
        <li>Storing in breathable cotton garment bags.</li>
      </ul>
    `
  },
  {
    id: 4,
    slug: "runway-to-reality-styling",
    title: "From Runway to Reality: Styling Evening Gowns",
    category: "Styling",
    date: "April 15, 2024",
    author: "Elena Rossi",
    excerpt: "High fashion doesn't have to be intimidating. Learn our top secrets for styling cinematic gowns for your next special occasion.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>The transition from a runway concept to a real-world event requires more than just a beautiful dress—it requires a vision. Our creative director shares her tips for making an entrance that lingers.</p>
      
      <h3>The Power of Proportions</h3>
      <p>When wearing a floor-length gown, balance is key. If the dress has a high neckline, opt for statement earrings and pulled-back hair. For a deep V-neck, a delicate layered necklace can add a touch of intimacy.</p>
      
      <h3>Footwear: The Silent Partner</h3>
      <p>Comfort is the true secret to grace. Our 10cm stilettos are designed for stability, but for outdoor garden parties, a block heel provides the necessary support without losing the elevation.</p>
      
      <p>Remember: You wear the dress; the dress doesn't wear you. Confidence is the final accessory that completes any ARIA look.</p>
    `
  },
  {
    id: 5,
    slug: "power-of-accessories",
    title: "The Power of Accessories: Elevating a Simple Outfit",
    category: "Style Guide",
    date: "April 16, 2024",
    author: "Marco Valli",
    excerpt: "A white tee and jeans can become a statement look with the right touches. Explore the transformative power of ARIA's accessory collection.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>Accessories are the exclamation point of a woman's outfit. They provide the personal touch that transforms a garment into a look.</p>
      
      <h3>The Three-Accessory Rule</h3>
      <p>At ARIA, we often suggest the 'Three-Accessory Rule': choose three points of interest. For example: a statement necklace, a structured clutch, and a pair of bold heels. This creates a cohesive narrative without crowding the silhouette.</p>
      
      <h3>Investing in Quality</h3>
      <p>A crossbody bag in full-grain Italian leather or 18K gold-plated jewelry are investments that pay off every time you step out. These pieces don't just 'match' an outfit; they define it.</p>
    `
  },
  {
    id: 6,
    slug: "behind-the-seams-craftsmanship",
    title: "Behind the Seams: The Craftsmanship of ARIA",
    category: "Inside ARIA",
    date: "April 18, 2024",
    author: "Sofia Chen",
    excerpt: "Take an exclusive peek into our atelier and meet the artisans who bring ARIA's vision to life through centuries-old techniques.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    content: `
      <p>Every ARIA piece begins as a sketch and ends as a legacy. Today, we're pulling back the curtain on the meticulous process that goes into every garment in our collection.</p>
      
      <h3>The Human Touch</h3>
      <p>While technology has changed fashion, it can never replace the intuition of a master tailor. Each pattern is hand-cut to ensure the grain of the fabric falls perfectly over the body.</p>
      
      <h3>The Zardozi Tradition</h3>
      <p>Our festive collection features zardozi embroidery—an ancient Persian art form that uses metallic threads and beads. Our artisans spend hundreds of hours on a single piece, ensuring that every sequin is a testament to their dedication.</p>
      
      <p>By choosing ARIA, you aren't just buying clothes; you're supporting the preservation of artisanal craft.</p>
    `
  }
];

export const contactData = {
  address: "Aira Fashion A-88, Sector 4 Noida, Uttar Pradesh – 201301",
  nearestMetro: "Sector 16",
  phone: "+91 81300 65326",
  email: "support@ariafashion.com",
  workingHours: [
    { day: "Monday - Friday", time: "10:00 AM - 7:00 PM" },
    { day: "Saturday", time: "10:00 AM - 5:00 PM" },
    { day: "Sunday", time: "Closed" }
  ],
  socials: [
    { name: "Instagram", url: "https://instagram.com/ariafashion", handle: "@ariafashion" },
    { name: "Facebook", url: "https://facebook.com/ariafashion", handle: "Aria Fashion Official" },
    { name: "Twitter", url: "https://twitter.com/ariafashion", handle: "@aria_fashion" }
  ],
  locations: [
    {
      name: "Flagship Store - Noida",
      address: "A-88, Sector 4, Noida, UP - 201301",
      phone: "+91 81300 65326",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.468214349138!2d77.3195!3d28.5855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce45f3f000001%3A0x7d6c6e765509c370!2sSector%204%2C%20Noida%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sin!4v1713260000000!5m2!1sen!2sin"
    }
  ]
};