document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    const products = [
        { id: 1, name: 'AirPods Pro', price: 249, category: 'tech', icon: '🎧', desc: 'Cancelación activa de ruido y modo de transparencia para que oigas lo que te rodea.' },
        { id: 2, name: 'iPhone 14', price: 999, category: 'tech', icon: '📱', desc: 'Sistema potente de cámara dual y chip A15 Bionic ultra rápido para todas tus tareas.' },
        { id: 3, name: 'Smart Watch', price: 199, category: 'tech', icon: '⌚', desc: 'Mide tu oxígeno en sangre con un sensor y una aplicación revolucionarios.' },
        { id: 4, name: 'Nike Shield', price: 120, category: 'fashion', icon: '👟', desc: 'Zapatillas diseñadas para correr en condiciones climáticas adversas con total tracción.' },
        { id: 5, name: 'Gafas Retro', price: 45, category: 'fashion', icon: '🕶️', desc: 'Protección UV400 y montura de acetato de alta calidad con estilo vintage atemporal.' },
        { id: 6, name: 'MacBook Air', price: 1199, category: 'tech', icon: '💻', desc: 'Chip M2 ultra eficiente que te permite trabajar y jugar en cualquier lugar sin cables.' },
        { id: 7, name: 'Lámpara LED', price: 35, category: 'home', icon: '💡', desc: 'Iluminación inteligente compatible con asistentes de voz y control desde el móvil.' },
        { id: 8, name: 'Altavoz BT', price: 85, category: 'tech', icon: '🔊', desc: 'Sonido envolvente 360 grados y resistencia al agua para llevar tu música a todas partes.' },
    ];

    let cart = [];

    // --- Selectors ---
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    const featuredGrid = document.getElementById('featured-products');
    const catalogGrid = document.getElementById('catalog-products');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartBadge = document.querySelector('.cart-badge');
    const subtotalEl = document.getElementById('subtotal-val');
    const totalEl = document.getElementById('total-val');
    const categoryItems = document.querySelectorAll('.category-item');
    const productDetailView = document.getElementById('product-detail-view');

    // --- Auth Check (Guest Mode) ---
    const userName = localStorage.getItem('userName');
    const loginBtn = document.getElementById('login-nav-btn');
    const profileName = document.querySelector('#profile-view h3');

    if (userName) {
        if (profileName) profileName.textContent = userName;
        if (loginBtn) loginBtn.classList.add('hidden');
    } else {
        if (profileName) profileName.textContent = 'Modo Invitado';
        if (loginBtn) {
            loginBtn.classList.remove('hidden');
            loginBtn.onclick = () => window.location.href = 'signup.html';
        }
    }

    // --- Navigation Logic ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetView = item.dataset.view;
            showView(targetView);
        });
    });

    window.showView = (viewName) => {
        // Update nav active state
        navItems.forEach(i => {
            i.classList.remove('active');
            if (i.dataset.view === viewName) i.classList.add('active');
        });

        // Switch views
        views.forEach(view => {
            view.classList.remove('active');
            if (view.id === `${viewName}-view`) {
                view.classList.add('active');
            }
        });

        // Specific view initialization
        if (viewName === 'search') {
            document.getElementById('main-search-input').focus();
            renderSearchResults('');
        }
    };

    // --- Product Rendering ---
    function renderProducts(filterCategory = 'all') {
        const filtered = filterCategory === 'all'
            ? products
            : products.filter(p => p.category === filterCategory);

        if (featuredGrid) featuredGrid.innerHTML = products.slice(0, 4).map(p => createProductCard(p)).join('');
        if (catalogGrid) catalogGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');

        attachProductListeners();
    }

    function createProductCard(product) {
        return `
            <div class="product-card" onclick="openProduct(${product.id})">
                <div class="product-img">${product.icon}</div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <p>${product.desc.substring(0, 30)}...</p>
                    <div class="product-footer">
                        <span class="price">$${product.price}</span>
                        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // --- Product Detail logic ---
    window.openProduct = (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        productDetailView.innerHTML = `
            <div class="detail-header">
                <button class="btn-close-detail" onclick="closeProduct()"><i class="fa-solid fa-xmark"></i></button>
                <button class="btn-close-detail" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
            <div class="detail-content animate-in">
                <div class="detail-img-large">${product.icon}</div>
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <div class="detail-price">$${product.price}</div>
                    <p class="detail-desc">${product.desc}</p>
                    <button class="btn-auth-submit" onclick="addToCart(${product.id}); closeProduct();">
                        Añadir al Carrito
                    </button>
                </div>
            </div>
        `;
        productDetailView.classList.remove('hidden');
    };

    window.closeProduct = () => {
        productDetailView.classList.add('hidden');
    };

    function attachProductListeners() {
        // Obsolete as we use onclick in template for simplicity in this demo
    }

    // --- Search Logic ---
    const searchInput = document.getElementById('main-search-input');
    if (searchInput) {
        searchInput.oninput = (e) => {
            renderSearchResults(e.target.value);
        };
    }

    function renderSearchResults(query) {
        const resultsGrid = document.getElementById('search-results');
        if (!resultsGrid) return;

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.desc.toLowerCase().includes(query.toLowerCase())
        );

        if (filtered.length === 0) {
            resultsGrid.innerHTML = '<p class="empty-msg">No se encontraron resultados</p>';
        } else {
            resultsGrid.innerHTML = filtered.map(p => createProductCard(p)).join('');
        }
    }

    // --- Cart Logic ---
    window.addToCart = (productId) => {
        // Require auth to buy
        if (!localStorage.getItem('userName')) {
            if (confirm('Debes estar registrado para comprar. ¿Ir al registro?')) {
                window.location.href = 'signup.html';
            }
            return;
        }

        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.qty++;
        } else {
            cart.push({ ...product, qty: 1 });
        }

        updateCartUI();

        // Notification logic could go here
    };

    function updateCartUI() {
        const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);
        if (cartBadge) {
            cartBadge.textContent = totalQty;
            cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
        }

        if (cartItemsContainer) {
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align:center; padding: 40px; color:#64748b;">Tu carrito está vacío</p>';
            } else {
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-img">${item.icon}</div>
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <span class="price">$${item.price}</span>
                            <div class="cart-controls">
                                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                                <span class="qty">${item.qty}</span>
                                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                            </div>
                        </div>
                        <button class="qty-btn" style="color:var(--accent); border:none;" onclick="removeFromCart(${item.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                `).join('');
            }
        }

        const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;
    }

    window.changeQty = (id, delta) => {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                removeFromCart(id);
            } else {
                updateCartUI();
            }
        }
    };

    window.removeFromCart = (id) => {
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
    };

    // --- Category Filtering ---
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
            renderProducts(item.dataset.category);
        });
    });

    // --- Initialization ---
    renderProducts();
    updateCartUI();

    console.log('NexStore finalized with Guest Mode 🚀');
});
