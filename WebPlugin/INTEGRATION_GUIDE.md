# Product Widget - Complete Integration Guide

> **FOR AI AGENTS**: This is the ONLY document you need. Follow each step exactly as written. Minimal changes to the host application are required.

---

## What is This Widget?

The Product Widget is a self-contained Angular Web Component that displays a product catalog with ordering capability. It is designed to be embedded in any Angular 15+ application.

**Features:**
- Product grid with horizontal tiles (Citi Marketplace style)
- Delivery time indicators on each tile
- Order form with Machine, Version, and Approver dropdowns
- Page-based navigation (click product → shows order form page → back button)
- Built WITHOUT zone.js (uses host app's zone.js to avoid conflicts)

**Total Changes Required in Host App: 3 lines of code**

---

## Prerequisites

- Node.js 18+ installed
- Host Angular application is version 15+
- Access to the WebPlugin source code

---

## Step 1: Build the Widget

Run these commands in the `WebPlugin` directory:

```bash
cd /path/to/WebPlugin

npm install

npm run build:elements
```

**Expected Output:**
```
✨ Build complete!

📦 Output files:
   - dist/product-widget/product-widget.js
   - dist/product-widget/assets/
```

---

## Step 2: Copy Files to Host Application

### Create destination folder and copy files:

```bash
# Create the widgets folder in your host app
mkdir -p /path/to/your-app/src/assets/widgets

# Copy the main JavaScript bundle
cp /path/to/WebPlugin/dist/product-widget/product-widget.js /path/to/your-app/src/assets/widgets/

# Copy the assets folder (contains product images)
cp -r /path/to/WebPlugin/dist/product-widget/assets /path/to/your-app/src/assets/widgets/
```

### Verify the resulting structure:

```
your-app/
└── src/
    └── assets/
        └── widgets/
            ├── product-widget.js
            └── assets/
                └── products/
                    ├── headphones_1769364775116.png
                    ├── laptop_1769364788924.png
                    ├── mouse_1769364802377.png
                    └── ... (13 more images)
```

---

## Step 3: Modify Host Application (3 CHANGES TOTAL)

### Change 1: Add Script Tag to `src/index.html`

Open `src/index.html` and add this line BEFORE the closing `</body>` tag:

```html
<script src="assets/widgets/product-widget.js" defer></script>
```

**Full example of index.html:**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Your Application</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <app-root></app-root>
  <script src="assets/widgets/product-widget.js" defer></script>
</body>
</html>
```

---

### Change 2: Add CUSTOM_ELEMENTS_SCHEMA

**For NgModule-based apps**, edit `src/app/app.module.ts`:

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // <-- ADD THIS LINE
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**For Standalone apps**, add schema to the component:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-your-page',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // <-- ADD THIS LINE
  template: `<product-widget></product-widget>`
})
export class YourPageComponent { }
```

---

### Change 3: Add Widget Tag to Template

Add this tag wherever you want the widget to appear:

```html
<product-widget></product-widget>
```

The widget will fill the container it's placed in.

---

## Complete Integration Summary

| Step | File | Change |
|------|------|--------|
| 1 | `src/index.html` | Add `<script src="assets/widgets/product-widget.js" defer></script>` |
| 2 | `src/app/app.module.ts` | Add `CUSTOM_ELEMENTS_SCHEMA` to schemas array |
| 3 | Your component template | Add `<product-widget></product-widget>` |

**That's it. Only 3 lines changed in your application.**

---

## Verification

After integration, verify these work:

1. ✅ Products display in a 4-column grid
2. ✅ Each tile shows image on left, content on right
3. ✅ "Delivers in: X DAYS" visible at bottom of tiles
4. ✅ Clicking a tile navigates to order form page
5. ✅ Order form shows 3 dropdowns (Machine, Version, Approver)
6. ✅ "Back to Products" button returns to grid
7. ✅ No console errors

---

## Troubleshooting

### Widget not appearing
- Check browser console for errors
- Verify script is loaded in Network tab
- Ensure the script path matches: `assets/widgets/product-widget.js`

### Error: "'product-widget' is not a known element"
- Add `CUSTOM_ELEMENTS_SCHEMA` to your module or component
- Import it from `@angular/core`

### Zone.js conflict or duplicate zone error
- This should not happen. The widget excludes zone.js.
- If it occurs, ensure you built with `npm run build:elements`

### NullInjectorError on page navigation
- This is fixed in current build
- Widget stores Angular instance globally and reuses it

### Images not loading / broken images
- Verify `src/assets/widgets/assets/products/` folder exists
- Check that PNG files were copied correctly

---

## Updating the Widget

When the widget source code is updated:

```bash
# 1. Navigate to WebPlugin
cd /path/to/WebPlugin

# 2. Rebuild
npm run build:elements

# 3. Copy updated files to host app
cp dist/product-widget/product-widget.js /path/to/your-app/src/assets/widgets/
cp -r dist/product-widget/assets /path/to/your-app/src/assets/widgets/

# 4. Refresh browser (no rebuild of host app needed)
```

---

## Development (Running Widget Standalone)

To run the widget by itself for testing:

```bash
cd /path/to/WebPlugin
npm start
```

Open http://localhost:4200 to see the widget.

---

## Widget Source Structure

```
WebPlugin/
├── src/app/components/
│   ├── product-widget/     # Main container component
│   ├── product-grid/       # Grid layout 
│   ├── product-tile/       # Individual tile (horizontal layout)
│   ├── order-form/         # Order form page with 3 dropdowns
│   └── pagination/         # Pagination with items per page
├── src/app/services/
│   └── product.service.ts  # Mock data (replace with API later)
├── src/app/models/
│   └── product.model.ts    # Product interface
├── build-elements.js       # Build script
└── angular.json            # Angular config with 'elements' build
```

---

## Commands Reference

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies (first time only) |
| `npm run build:elements` | Build widget for integration |
| `npm start` | Run widget standalone for development |

---

## Output Files Reference

| File | Size | Description |
|------|------|-------------|
| `product-widget.js` | ~150KB | Main bundle (no zone.js included) |
| `assets/products/*.png` | ~2MB total | 16 product images |

---

## End of Document

Follow the steps above exactly and the widget will integrate successfully.
