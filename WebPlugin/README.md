# Product Widget

A standalone Angular web component that displays a product catalog with a sidebar containing user/device information.

![Product Widget Preview](/Users/pranavpandey/.gemini/antigravity/brain/1aff9d03-66b3-45a3-bb06-6522433b05f9/final_layout_verification_1769383923380.png)

## Quick Start (Development)

```bash
cd WebPlugin
npm install
npm start
```

Open http://localhost:4200 to see the widget with mock data.

## Build for Production

```bash
npm run build:elements
```

Output: `dist/product-widget/` containing the standalone bundle.

## Integration

See **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** for step-by-step instructions.

### Minimal Integration (3 steps)

1. **Build**: Run `npm run build:elements`
2. **Copy**: Copy `dist/product-widget/` to your app's public folder
3. **Use**: Add `<script src="/product-widget/product-widget.js" defer></script>` and `<product-widget></product-widget>` to your HTML

## Features

- ✅ 16 tech products with AI-generated images
- ✅ Left sidebar with user profile, device info, storage, and stats
- ✅ Pagination (8 items per page)
- ✅ Modern UI with gradients and animations
- ✅ Built-in mock data (no backend required)
- ✅ Web Component standard (works with any framework)

## Architecture

```
src/app/
├── components/
│   ├── product-widget/    # Main container component
│   ├── product-grid/      # Product tile grid
│   ├── product-card/      # Individual product card
│   ├── pagination/        # Page navigation
│   └── sidebar/           # User/device info panel
├── models/
│   └── product.model.ts   # Product interface
└── services/
    └── product.service.ts # Mock data provider
```

## Mock Data Customization

Edit `src/app/services/product.service.ts` to modify products.
Edit `src/app/components/sidebar/sidebar.component.ts` to modify user/device info.
