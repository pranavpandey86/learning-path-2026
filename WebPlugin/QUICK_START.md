# Product Widget - Quick Start Guide

## After Cloning the Repository

### 1. Install Dependencies
```bash
cd WebPlugin
npm install
```

### 2. Run the Demo (Development Mode)
```bash
npm start
```
Open **http://localhost:4200** - you'll see the complete widget with all 16 products and images.

---

## Adding to Your Company Project

### Option A: Embed as Web Component (Recommended)

Build the standalone bundle:
```bash
npm run build:elements
```

This creates `dist/product-widget/` containing:
- `product-widget.js` (main bundle)
- `product-widget.css` (styles)
- `assets/products/*.png` (16 product images)

**Copy these files to your company project** and add to your HTML:
```html
<!-- In your company's index.html -->
<link rel="stylesheet" href="path/to/product-widget.css">
<script src="path/to/product-widget.js"></script>

<!-- Use the widget -->
<product-widget></product-widget>
```

### Option B: Serve the Built Files Locally

After building, serve the `dist/product-widget` folder:
```bash
npx serve dist/product-widget
```

---

## Mock Data (Already Configured!)

The widget uses **built-in mock data** - no backend required!

The mock products are defined in:
```
src/app/services/product.service.ts
```

All 16 products with images are pre-configured and work offline.

---

## File Structure for Your Company Project
```
your-company-app/
├── index.html
├── assets/
│   └── product-widget/
│       ├── product-widget.js
│       ├── product-widget.css
│       └── assets/
│           └── products/
│               ├── headphones_*.png
│               ├── laptop_*.png
│               └── ... (16 images)
```

---

## Quick Checklist

- [x] Clone repo
- [x] `npm install`
- [x] `npm start` → Demo ready at localhost:4200
- [ ] `npm run build:elements` → Build for production
- [ ] Copy `dist/product-widget/*` to your company project
- [ ] Include the JS and CSS in your HTML
