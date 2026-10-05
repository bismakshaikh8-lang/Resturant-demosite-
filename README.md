# 🍔 Feastify — Modern Gourmet Food Delivery & Restaurant Web Application

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)

**Feastify** is a high-performance, visually stunning, fully interactive gourmet restaurant and food delivery landing page built with pure Vanilla HTML5, CSS3, and JavaScript. Designed with premium dark glassmorphism, rich micro-animations, a dynamic filterable menu, live interactive shopping cart drawer, and responsive mobile navigation.

---

## 🎨 Theme & Design System

The application features a **Clean, Light & Food-Centric Minimalist** design system crafted to make food photography pop:

- **Clean Background Canvas**: Warm Off-White (`#FAF9F6`) & Crisp White (`#FFFFFF`)
- **Gourmet Accents**: Appetite-inducing Warm Orange (`#FF5722`) & Radiant Amber Gold (`#FFB300`)
- **Typography & Hierarchy**: High-contrast Dark Slate (`#0F172A`) for headings & Warm Slate Grey (`#64748B`) for body text
- **Clean Cards & Borders**: Soft subtle drop-shadows (`0 10px 30px rgba(0,0,0,0.06)`) with light borders (`#E2E8F0`)
- **Typography Fonts**: Google Fonts — *Plus Jakarta Sans* (Body) & *Poppins* (Headings)

---

## ✨ Features & Functionality

### 1. 🚀 Interactive Navigation & Header
- **Glassmorphism Header**: Fixed position with backdrop blur and automatic background state changes on scroll.
- **Dynamic Cart Counter**: Live badge updating item count in real-time.
- **Mobile Responsive Drawer**: Mobile toggle menu for seamless navigation on smaller devices.

### 2. 🌟 Hero Section
- **Visual Centerpiece**: Stacked gourmet burger centerpiece with pulse glow animations.
- **Floating Badges**: Real-time 5-star customer review card, subscriber highlight, and 25-30 minute express ETA pill.
- **Social Proof**: Avatar stack highlighting 1,500+ satisfied diners.

### 3. 🔥 Asymmetric Promotional Banner Grid
- **Custom Discount Cards**: 40% OFF, 50% OFF, and 30% OFF promo deals.
- **Quick Order Integration**: Direct 1-click `Order Now` buttons that immediately add items to the cart drawer.

### 4. 🍽️ Dynamic Filterable Menu
- **Category Filtering**: Filter dishes dynamically by *All Dishes*, *Burgers*, *Artisan Pizzas*, *Fresh Bowls*, *Sides*, and *Beverages*.
- **Interactive Add to Cart**: Live state management updating the cart upon item selection.

### 5. 🛒 Shopping Cart Slide-out Drawer
- **Persistent State**: Utilizes `localStorage` to save cart items across browser sessions.
- **Live Quantity Control**: Increase (`+`) or decrease (`-`) quantities directly inside the drawer.
- **Automatic Calculations**: Dynamic subtotal, delivery fee ($2.99), and order total calculations.
- **1-Click Checkout**: Instant checkout execution with interactive toast notifications.

### 6. 🔐 User Login Modal & Notifications
- **Login Modal**: Glassmorphism backdrop modal with form validation and Escape key close support.
- **Toast System**: Custom popup notifications for item additions, checkout completion, and subscription alerts.

---

## 📁 File Structure

```
resturant website/
├── css/
│   └── style.css            # Core Design System, Variables, Animations & Layouts
├── images/
│   ├── customer_enjoying.jpg # Customer & Testimonial images
│   ├── hero_burger.jpg       # Main Hero centerpiece image
│   ├── menu_drink_mojito.jpg # Beverage menu item
│   ├── menu_truffle_fries.jpg# Side menu item
│   ├── promo_fresh_bowl.jpg  # Healthy bowl promo card
│   ├── promo_loaded_burger.jpg# Loaded burger promo card
│   └── promo_pizza.jpg       # Woodfired pizza promo card
├── js/
│   └── app.js               # Data objects, Cart logic, Modal & Menu filtering
├── index.html               # Semantic HTML5 Structure
└── README.md                # Project Documentation & Usage Guide
```

---

## ⚡ How to Run Locally

You don't need any complex build step or framework installation to run Feastify.

### Option 1: Python HTTP Server (Recommended)
Open your terminal in the project directory and run:
```bash
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

### Option 2: VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html`.
3. Select **"Open with Live Server"**.

### Option 3: Node.js `npx http-server`
```bash
npx http-server ./ -p 8080
```

---

## 🛠️ Customization Guide

- **Adding New Menu Items**: Edit the `menuItems` array in [`js/app.js`](file:///e:/practice/resturant%20website/js/app.js) with item details, prices, categories, and image paths.
- **Updating Theme Colors**: Modify the CSS variables inside `:root` at the top of [`css/style.css`](file:///e:/practice/resturant%20website/css/style.css).

---

## 📜 License

This project is licensed under the MIT License.
