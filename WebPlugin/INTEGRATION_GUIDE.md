# Product Widget - Integration Guide for AI Agents

> **For Claude/Copilot**: This document contains step-by-step instructions to integrate the Product Widget into a main application. Follow each step exactly as written.

---

## Prerequisites

- Node.js 18+ installed
- The main company application (Angular, React, Vue, or plain HTML)
- This WebPlugin repository cloned locally

---

## Step 1: Build the Widget Bundle

```bash
# Navigate to the WebPlugin folder
cd WebPlugin

# Install dependencies
npm install

# Build the standalone web component bundle
npm run build:elements
```

**Expected output**: A `dist/product-widget/` folder containing:
- `product-widget.js` (main bundle ~150KB)
- `styles.css` (optional, styles are embedded)
- `assets/products/*.png` (16 product images)

---

## Step 2: Copy Files to Your Main Application

Copy the following files from `dist/product-widget/` to your main application's static/public folder:

```
YOUR_MAIN_APP/
├── public/               (or 'static/' or 'assets/')
│   └── product-widget/
│       ├── product-widget.js
│       └── assets/
│           └── products/
│               ├── headphones.png
│               ├── laptop.png
│               ├── mouse.png
│               ├── keyboard.png
│               ├── monitor.png
│               ├── webcam.png
│               ├── speakers.png
│               ├── controller.png
│               ├── usb_hub.png
│               ├── ssd.png
│               ├── laptop_stand.png
│               ├── desk_lamp.png
│               ├── wireless_charger.png
│               ├── earbuds.png
│               ├── drawing_tablet.png
│               └── microphone.png
```

---

## Step 3: Add to Your HTML

### Option A: Plain HTML Application

Add these lines to your `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Your App</title>
  <!-- Load the widget script -->
  <script src="/product-widget/product-widget.js" defer></script>
</head>
<body>
  <!-- Place the widget where you want it to appear -->
  <product-widget></product-widget>
</body>
</html>
```

### Option B: Angular Application

1. Add script to `angular.json`:
```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "scripts": [
              "src/assets/product-widget/product-widget.js"
            ]
          }
        }
      }
    }
  }
}
```

2. Add to `app.module.ts`:
```typescript
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ... rest of config
})
export class AppModule { }
```

3. Use in any component template:
```html
<product-widget></product-widget>
```

### Option C: React Application

1. Add script tag to `public/index.html`:
```html
<script src="/product-widget/product-widget.js" defer></script>
```

2. Use in any React component:
```jsx
function App() {
  return (
    <div>
      <product-widget></product-widget>
    </div>
  );
}
```

### Option D: Vue Application

1. Add script tag to `public/index.html`:
```html
<script src="/product-widget/product-widget.js" defer></script>
```

2. Configure Vue to ignore custom elements in `vite.config.js` or `vue.config.js`:
```javascript
// vite.config.js
export default {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'product-widget'
        }
      }
    })
  ]
}
```

3. Use in any Vue component:
```vue
<template>
  <product-widget></product-widget>
</template>
```

---

## Step 4: Verify Integration

1. Start your main application's dev server
2. Navigate to the page where you added `<product-widget>`
3. You should see:
   - A left sidebar with user info, device info, and stats
   - A product grid with 16 tech accessories
   - Pagination controls (8 products per page)
   - All product images loading correctly

---

## Troubleshooting

### Images Not Loading
**Issue**: Product images show broken image icons.
**Fix**: Ensure the `assets/products/` folder is copied to the correct location and accessible via the same base URL as the widget script.

### Widget Not Appearing
**Issue**: The `<product-widget>` tag shows nothing.
**Fix**: 
1. Check browser console for errors
2. Verify the script is loaded (Network tab)
3. Ensure `defer` attribute is on the script tag

### Styles Look Wrong
**Issue**: Widget appears but looks broken.
**Fix**: The widget uses Shadow DOM for style isolation. If styles are still affected, check for global CSS resets that might interfere.

---

## Widget Configuration (Optional)

The widget accepts these attributes:

```html
<product-widget 
  items-per-page="8"
  api-base-url="https://api.example.com">
</product-widget>
```

| Attribute | Default | Description |
|-----------|---------|-------------|
| `items-per-page` | `8` | Number of products per page |
| `api-base-url` | `""` | API URL (uses mock data if empty) |

---

## Mock Data

The widget uses **built-in mock data** by default:
- 16 tech products with images
- No backend API required
- Perfect for demos and prototyping

Mock data is defined in `src/app/services/product.service.ts`.

---

## File Summary

| File | Purpose |
|------|---------|
| `product-widget.js` | Main widget bundle (includes all components) |
| `assets/products/*.png` | 16 AI-generated product images |
| `src/app/components/sidebar/` | Left sidebar with user/device info |
| `src/app/components/product-grid/` | Product tile grid |
| `src/app/services/product.service.ts` | Mock product data |
