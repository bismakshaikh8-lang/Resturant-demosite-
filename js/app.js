/**
 * FEASTIFY / BITECRAFT - RESTAURANT & FOOD DELIVERY WEB APP
 * Vanilla JavaScript Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA: MENU ITEMS
  // ==========================================
  const menuItems = [
    {
      id: 'item-1',
      name: 'The Ultimate Double Smash',
      category: 'burgers',
      price: 13.99,
      rating: 4.9,
      reviewsCount: 342,
      description: 'Two grass-fed smashed patties, melted aged cheddar, smoked bacon, caramelized onions & secret glaze on toasted brioche.',
      image: 'images/hero_burger.jpg',
      badge: 'Bestseller',
      badgeClass: 'yellow'
    },
    {
      id: 'item-2',
      name: 'Loaded Stack Cheeseburger',
      category: 'burgers',
      price: 14.49,
      rating: 4.8,
      reviewsCount: 280,
      description: 'Handcrafted premium beef patty, dripping cheddar, sliced ripe tomatoes, fresh crisp lettuce & house pickle relish.',
      image: 'images/promo_loaded_burger.jpg',
      badge: 'Chef Special',
      badgeClass: 'mint'
    },
    {
      id: 'item-3',
      name: 'Artisan Woodfired Pepperoni',
      category: 'pizzas',
      price: 16.99,
      rating: 4.9,
      reviewsCount: 512,
      description: 'Slow-fermented sourdough crust, San Marzano tomato sauce, stretched fior di latte mozzarella and spicy pepperoni.',
      image: 'images/promo_pizza.jpg',
      badge: 'Hot Offer',
      badgeClass: 'yellow'
    },
    {
      id: 'item-4',
      name: 'Salmon Teriyaki Harvest Bowl',
      category: 'bowls',
      price: 15.50,
      rating: 4.9,
      reviewsCount: 198,
      description: 'Flame-seared teriyaki salmon, organic warm brown rice, sliced Hass avocado, steamed edamame, and sesame microgreens.',
      image: 'images/promo_fresh_bowl.jpg',
      badge: 'Healthy Choice',
      badgeClass: 'mint'
    },
    {
      id: 'item-5',
      name: 'Truffle Herb Parmesan Fries',
      category: 'sides',
      price: 7.99,
      rating: 4.8,
      reviewsCount: 220,
      description: 'Twice-cooked golden fries, black truffle oil infusion, freshly grated parmesan cheese, and garlic herb aioli dip.',
      image: 'images/menu_truffle_fries.jpg',
      badge: 'Popular',
      badgeClass: 'yellow'
    },
    {
      id: 'item-6',
      name: 'Sparkling Artisan Mint Mojito',
      category: 'drinks',
      price: 5.99,
      rating: 4.9,
      reviewsCount: 164,
      description: 'Muddled fresh mint, organic lime juice, pure cane sugar syrup, and fizzy sparkling mineral water on crushed ice.',
      image: 'images/menu_drink_mojito.jpg',
      badge: 'Refreshing',
      badgeClass: 'mint'
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT (CART)
  // ==========================================
  let cart = [];
  try {
    const savedCart = localStorage.getItem('feastify_cart');
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (e) {
    cart = [];
  }

  const saveCart = () => {
    localStorage.setItem('feastify_cart', JSON.stringify(cart));
    updateCartUI();
  };

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================
  const navHeader = document.querySelector('.site-header');
  const cartNavBtn = document.getElementById('cart-nav-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCountNav = document.getElementById('cart-count-badge');
  const checkoutBtn = document.getElementById('checkout-btn');

  // Menu DOM
  const menuGrid = document.getElementById('menu-items-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Login Modal
  const loginNavBtn = document.getElementById('login-nav-btn');
  const loginModal = document.getElementById('login-modal');
  const loginCloseBtn = document.getElementById('login-close-btn');
  const loginForm = document.getElementById('login-form');

  // Mobile Menu
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.querySelector('.nav-menu');

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');

  // ==========================================
  // 4. NAVBAR SCROLL EFFECT
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navHeader.classList.add('scrolled');
    } else {
      navHeader.classList.remove('scrolled');
    }
  });

  // Mobile Toggle
  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }

  // ==========================================
  // 5. TOAST NOTIFICATIONS
  // ==========================================
  const showToast = (message, icon = '🔥') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // ==========================================
  // 6. RENDER MENU ITEMS
  // ==========================================
  const renderMenuItems = (category = 'all') => {
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    const filtered = category === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === category);

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'menu-item-card';
      card.setAttribute('data-category', item.category);

      card.innerHTML = `
        <div class="menu-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="item-badge-tag ${item.badgeClass}">${item.badge}</span>
        </div>
        <div class="menu-item-header">
          <h3 class="item-name">${item.name}</h3>
          <span class="item-price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="item-desc">${item.description}</p>
        <div class="menu-item-footer">
          <div class="item-rating">
            <span class="star">★</span> ${item.rating} <span style="opacity: 0.6; font-size: 0.78rem;">(${item.reviewsCount})</span>
          </div>
          <button class="btn-add-cart" data-id="${item.id}">
            Add +
          </button>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    // Attach click listeners to Add buttons
    menuGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        addToCart(itemId);
      });
    });
  };

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderMenuItems(category);
    });
  });

  // Initial Menu Render
  renderMenuItems('all');

  // ==========================================
  // 7. CART FUNCTIONALITY
  // ==========================================
  const addToCart = (itemId, customQty = 1) => {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingIndex = cart.findIndex(c => c.id === itemId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += customQty;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: customQty
      });
    }

    saveCart();
    showToast(`Added "${item.name}" to cart!`);
    pulseCartIcon();
  };

  const updateQuantity = (itemId, change) => {
    const itemIndex = cart.findIndex(c => c.id === itemId);
    if (itemIndex > -1) {
      cart[itemIndex].quantity += change;
      if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
      }
      saveCart();
    }
  };

  const pulseCartIcon = () => {
    if (cartNavBtn) {
      cartNavBtn.style.transform = 'scale(1.18)';
      setTimeout(() => {
        cartNavBtn.style.transform = 'scale(1)';
      }, 250);
    }
  };

  const updateCartUI = () => {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountNav) {
      cartCountNav.textContent = `Cart (${totalCount})`;
    }

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛒</div>
          <p style="font-weight: 700; margin-bottom: 6px;">Your cart is hungry!</p>
          <p style="font-size: 0.85rem;">Browse our delicious menu and add your favorite dishes.</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      return;
    }

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const row = document.createElement('div');
      row.className = 'cart-item';
      row.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" data-action="minus" data-id="${item.id}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(row);
    });

    const deliveryFee = 2.99;
    const total = subtotal + deliveryFee;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

    // Quantity button listeners
    cartItemsContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.currentTarget.getAttribute('data-action');
        const id = e.currentTarget.getAttribute('data-id');
        updateQuantity(id, action === 'plus' ? 1 : -1);
      });
    });
  };

  // Open & Close Cart
  const openCart = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeCart = () => {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (cartNavBtn) cartNavBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Checkout Button
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty! Add some items first.', '⚠️');
        return;
      }
      closeCart();
      showToast('🎉 Order placed successfully! Arriving in 25 mins.', '🚀');
      cart = [];
      saveCart();
    });
  }

  // ==========================================
  // 8. PROMO CARDS QUICK ORDER INTEGRATION
  // ==========================================
  document.querySelectorAll('.promo-order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetItem = e.currentTarget.getAttribute('data-item') || 'item-1';
      addToCart(targetItem);
      openCart();
    });
  });

  // Hero Quick Order Button
  const heroCtaBtn = document.getElementById('hero-cta-btn');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', () => {
      addToCart('item-1');
      openCart();
    });
  }

  // ==========================================
  // 9. LOGIN MODAL
  // ==========================================
  const openLogin = () => {
    if (loginModal) {
      loginModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLogin = () => {
    if (loginModal) {
      loginModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (loginNavBtn) loginNavBtn.addEventListener('click', openLogin);
  if (loginCloseBtn) loginCloseBtn.addEventListener('click', closeLogin);
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeLogin();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeLogin();
      showToast('Welcome back, Gourmet Foodie! 👨‍🍳', '✨');
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeLogin();
    }
  });

  // ==========================================
  // 10. NEWSLETTER FORM
  // ==========================================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast('Subscribed! 20% discount code sent to your email.', '🎁');
        input.value = '';
      }
    });
  }

  // Initial Cart Update
  updateCartUI();
});
