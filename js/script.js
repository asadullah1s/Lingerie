/* =========================
   PRODUCT DATA
   ========================= */
const products = [{
    id: 1,
    title: "Lace Mesh Teddy",
    code: "VN-101",
    category: "Lingerie",
    price: "$49.99",
    images: [
        "images/products/teddy1.jpg",
        "images/products/teddy2.jpg",
        "images/products/teddy3.jpg",
        "images/products/teddy4.jpg"
    ],
    description: `Sultry lace mesh teddy with adjustable straps and sheer details.
* Fabric: Premium lace & mesh
* Colour: Black
* Features: Adjustable straps, thong back
* Sizes: S-XXL

Product Highlights
Perfect for a romantic evening. The intricate lace pattern and sheer panels create an irresistible silhouette.

Care Instructions:
Hand wash cold, line dry.
Do not bleach.
Iron on low heat (avoid lace).`
}, {
    id: 2,
    title: "Silk Satin Nightgown",
    code: "VN-202",
    category: "Nightsuits",
    price: "$69.99",
    images: [
        "images/products/nightgown1.jpg",
        "images/products/nightgown2.jpg",
        "images/products/nightgown3.jpg",
        "images/products/nightgown4.jpg"
    ],
    description: `Luxurious silk satin nightgown with delicate lace trim.
* Fabric: 100% Mulberry Silk
* Colour: Champagne
* Features: Adjustable straps, V-neck, mid-thigh length
* Sizes: XS-XL

Product Highlights
Experience ultimate comfort and elegance. The soft satin drapes beautifully for a timeless look.

Care Instructions:
Hand wash cold.
Use gentle detergent.
Do not wring.
Dry flat away from direct heat.`
}, {
    id: 3,
    title: "Push-up Balconette Bra",
    code: "VN-303",
    category: "Bras",
    price: "$39.99",
    images: [
        "images/products/bra1.jpg",
        "images/products/bra2.jpg",
        "images/products/bra3.jpg",
        "images/products/bra4.jpg"
    ],
    description: `Push-up balconette bra with lace detailing and underwire support.
* Fabric: Lace & microfiber
* Colour: Black
* Features: Underwire, push-up padding, adjustable straps
* Sizes: 32A-38DD

Product Highlights
Lifts and shapes for a stunning silhouette. The lace adds a touch of romance.

Care Instructions:
Hand wash cold.
Do not tumble dry.
Avoid fabric softener.`
}, {
    id: 4,
    title: "High-Waist Lace Panty",
    code: "VN-404",
    category: "Panties",
    price: "$24.99",
    images: [
        "images/products/panty1.jpg",
        "images/products/panty2.jpg",
        "images/products/panty3.jpg",
        "images/products/panty4.jpg"
    ],
    description: `High-waist lace panty with sheer panels and a flattering cut.
* Fabric: Lace & stretch mesh
* Colour: Red
* Features: High-waist, sheer back, cotton gusset
* Sizes: S-L

Product Highlights
Comfort meets allure. The high-waist design accentuates curves while the lace adds a seductive edge.

Care Instructions:
Hand wash cold.
Do not bleach.
Line dry.`
}, {
    id: 5,
    title: "Satin Kimono Robe",
    code: "VN-505",
    category: "Nightsuits",
    price: "$89.99",
    images: [
        "images/products/robe1.jpg",
        "images/products/robe2.jpg",
        "images/products/robe3.jpg",
        "images/products/robe4.jpg"
    ],
    description: `Luxurious satin kimono robe with embroidered details.
* Fabric: Satin
* Colour: Dusty Rose
* Features: Belted, wide sleeves, knee-length
* Sizes: S-XL

Product Highlights
Wrap yourself in elegance. Perfect for lounging or as a luxurious cover-up.

Care Instructions:
Hand wash cold.
Do not twist.
Iron on low heat.`
}, {
    id: 6,
    title: "Body Briefer Corset",
    code: "VN-606",
    category: "Lingerie",
    price: "$79.99",
    images: [
        "images/products/corset1.jpg",
        "images/products/corset2.jpg",
        "images/products/corset3.jpg",
        "images/products/corset4.jpg"
    ],
    description: `Sculpting body briefer with lace and boning for a smooth silhouette.
* Fabric: Power mesh & lace
* Colour: Nude
* Features: Hook-and-eye closure, adjustable straps, thong back
* Sizes: S-XXL

Product Highlights
Slims and shapes while maintaining comfort. The sheer lace adds a sensual touch.

Care Instructions:
Hand wash cold.
Do not wring.
Dry flat.`
}];

/* =========================
   STATE
   ========================= */
let currentFilter = "all";
let currentSearch = "";

/* =========================
   HELPERS
   ========================= */
function getCardDescription(text, limit = 80) {
    if (!text) return '';
    let clean = text.replace(/\* /g, '• ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    if (clean.length > limit) {
        let cut = clean.substring(0, limit);
        let lastSpace = cut.lastIndexOf(' ');
        if (lastSpace > 0) cut = cut.substring(0, lastSpace);
        clean = cut + '...';
    }
    return clean;
}

function formatDescription(text) {
    if (!text) return '';
    let html = text.replace(/\* /g, '• ').replace(/\n/g, '<br>');
    const headers = ['Product Highlights', 'Care Instructions', 'Disclaimer', 'Sizes:', 'Fabric:', 'Colour:', 'Features:'];
    headers.forEach(h => {
        const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        html = html.replace(new RegExp(`(${escaped})`, 'g'), '<strong>$1</strong>');
    });
    html = html.replace(/(<br>){3,}/g, '<br><br>');
    return html;
}

function getWhatsAppLink(product) {
    const phone = "+1234567890";
    const msg = `Hello Velvet Noir, I'm interested in:\n*${product.title}*\nCode: ${product.code}\nPrice: ${product.price}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

/* =========================
   RENDER PRODUCT CARDS
   ========================= */
function renderProductCards(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    if (productsArray.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5">No products found</div>`;
        return;
    }
    container.innerHTML = productsArray.map(p => `
        <div class="col-lg-3 col-md-6 col-12 mb-4 product-card-item" data-product-id="${p.id}">
            <div class="product-card h-100">
                <img src="${p.images[0]}" class="card-img-top" alt="${p.title}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="category-badge">${p.category}</span>
                        <span class="price">${p.price}</span>
                    </div>
                    <h5 class="card-title mt-2 fw-bold">${p.title}</h5>
                    ${p.code ? `<div class="product-code small">${p.code}</div>` : ''}
                    <p class="card-text small text-secondary mt-2">${getCardDescription(p.description, 80)}</p>
                    <div class="mt-auto d-flex justify-content-between gap-2 pt-2">
                        <button class="btn btn-details view-details" data-id="${p.id}">View Details</button>
                        <button class="btn btn-buy-now buy-now-btn" data-id="${p.id}">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

/* =========================
   FILTER & SEARCH
   ========================= */
function filterProducts() {
    let filtered = products.filter(p => {
        const matchCat = currentFilter === "all" || p.category === currentFilter;
        const matchSearch = currentSearch === "" ||
            p.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.category.toLowerCase().includes(currentSearch.toLowerCase()) ||
            (p.code && p.code.toLowerCase().includes(currentSearch.toLowerCase()));
        return matchCat && matchSearch;
    });
    renderProductCards(filtered, "productContainer");
}

/* =========================
   SPECIAL SECTIONS
   ========================= */
function renderSpecialSections() {
    renderProductCards(products.filter(p => [1,2,3].includes(p.id)), "topPicksContainer");
    renderProductCards(products.filter(p => [4,5,6].includes(p.id)), "trendingContainer");
}

/* =========================
   MODAL
   ========================= */
const modalEl = document.getElementById("fullscreenModal");
const carouselInner = document.getElementById("modalCarouselInner");
const indicatorsContainer = document.getElementById("modalCarouselIndicators");
let modalCarouselInstance = null;

function openProductModal(productId) {
    const prod = products.find(p => p.id == productId);
    if (!prod) return;

    let slidesHtml = prod.images.map((img, idx) => `
        <div class="carousel-item ${idx === 0 ? 'active' : ''}">
            <img src="${img}" class="d-block w-100" style="height:100%; object-fit:cover;" alt="${prod.title}">
        </div>
    `).join('');

    let indicatorsHtml = prod.images.map((_, idx) => `
        <button type="button" data-bs-target="#modalCarousel" data-bs-slide-to="${idx}" class="${idx === 0 ? 'active' : ''}"></button>
    `).join('');

    carouselInner.innerHTML = slidesHtml;
    indicatorsContainer.innerHTML = indicatorsHtml;

    document.getElementById("modalCategory").innerText = prod.category;
    document.getElementById("modalTitle").innerText = prod.title;
    document.getElementById("modalCode").innerText = prod.code || '';
    document.getElementById("modalDesc").innerHTML = formatDescription(prod.description);
    document.getElementById("modalPrice").innerText = prod.price;

    document.getElementById("modalBuyNowBtn").onclick = function() {
        window.open(getWhatsAppLink(prod), '_blank');
    };

    modalEl.classList.add("active");
    document.body.style.overflow = "hidden";

    if (modalCarouselInstance) modalCarouselInstance.dispose();
    modalCarouselInstance = new bootstrap.Carousel(document.getElementById('modalCarousel'), {
        interval: 4000,
        pause: 'hover',
        wrap: true
    });

    history.pushState(null, null, `#product-${prod.id}`);
}

function closeModal() {
    modalEl.classList.remove("active");
    document.body.style.overflow = "";
    if (window.location.hash.startsWith("#product-")) history.pushState(null, null, " ");
    if (modalCarouselInstance) { modalCarouselInstance.dispose(); modalCarouselInstance = null; }
}

/* =========================
   EVENT HANDLERS
   ========================= */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-details") || e.target.closest(".view-details")) {
        const btn = e.target.classList.contains("view-details") ? e.target : e.target.closest(".view-details");
        openProductModal(parseInt(btn.dataset.id));
    }
    if (e.target.classList.contains("buy-now-btn") || e.target.closest(".buy-now-btn")) {
        const btn = e.target.classList.contains("buy-now-btn") ? e.target : e.target.closest(".buy-now-btn");
        const prod = products.find(p => p.id == parseInt(btn.dataset.id));
        if (prod) window.open(getWhatsAppLink(prod), '_blank');
    }
    if (e.target.closest(".close-modal")) closeModal();
    if (e.target === modalEl) closeModal();
});

/* Category filter links */
document.querySelectorAll(".filter-category-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = link.dataset.category;
        if (cat) {
            currentFilter = cat;
            document.getElementById("searchInput").value = "";
            filterProducts();
            document.querySelectorAll(".category-filter-btn").forEach(b => b.classList.remove("active-filter"));
            const activeBtn = Array.from(document.querySelectorAll(".category-filter-btn")).find(b => b.dataset.filter === cat);
            if (activeBtn) activeBtn.classList.add("active-filter");
            else document.querySelector(".category-filter-btn[data-filter='all']").classList.add("active-filter");
            document.getElementById("products").scrollIntoView({ behavior: "smooth" });
        }
    });
});

document.querySelectorAll(".category-filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        currentSearch = document.getElementById("searchInput").value;
        filterProducts();
        document.querySelectorAll(".category-filter-btn").forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
    });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
    currentSearch = e.target.value;
    filterProducts();
});

/* Newsletter */
document.getElementById("subscribeBtn").addEventListener("click", () => {
    const email = document.getElementById("newsEmail").value;
    const msg = document.getElementById("newsMsg");
    if (email && email.includes('@')) msg.innerHTML = "✨ Thank you for subscribing. You're now part of the Velvet Noir club.";
    else msg.innerHTML = "Please enter a valid email.";
    setTimeout(() => msg.innerHTML = "", 3500);
});

/* Scroll progress, back to top, navbar */
window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("scrollProgress").style.width = (winScroll/height)*100 + "%";

    document.getElementById("backToTop").classList.toggle("show", winScroll > 300);
    document.getElementById("mainNav").classList.toggle("scrolled", winScroll > 50);
});

document.getElementById("backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* Hash handling */
window.addEventListener("hashchange", () => {
    const hash = window.location.hash;
    if (hash.startsWith("#product-")) {
        const id = parseInt(hash.split("-")[1]);
        if (products.find(p => p.id === id)) openProductModal(id);
    } else closeModal();
});

/* =========================
   INIT
   ========================= */
renderProductCards(products, "productContainer");
renderSpecialSections();
filterProducts();
window.dispatchEvent(new Event("hashchange"));

AOS.init({ duration: 800, once: true, offset: 100 });
console.log('Velvet Noir — loaded.');
