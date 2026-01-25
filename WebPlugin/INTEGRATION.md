# Product Widget - Integration Guide

A self-contained Angular Web Component that displays tech products with pagination.

## Quick Start

### Option 1: Load from Remote URL (Recommended)

Add to your HTML:

```html
<!-- Load the widget bundle from your Artifactory/CDN -->
<link rel="stylesheet" href="https://your-artifactory.com/product-widget/v1.0.0/product-widget.css">
<script src="https://your-artifactory.com/product-widget/v1.0.0/product-widget.js"></script>

<!-- Use the custom element -->
<product-widget></product-widget>
```

### Option 2: Load from Local Files

```html
<link rel="stylesheet" href="./product-widget.css">
<script src="./product-widget.js"></script>

<product-widget></product-widget>
```

---

## Configuration

The widget accepts the following attributes:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `api-base-url` | string | "" | Base URL for the product API |
| `items-per-page` | number | 8 | Products per page |

### Example with Custom API

```html
<product-widget 
  api-base-url="https://api.yourbackend.com"
  items-per-page="6">
</product-widget>
```

---

## Files to Deploy

Upload these files to your Artifactory:

```
product-widget/
├── product-widget.js     # Main bundle (~400KB)
├── product-widget.css    # Styles
├── assets/               # Product images
│   └── products/
│       ├── headphones.svg
│       ├── laptop.svg
│       └── ...
└── test.html             # Test page (optional)
```

---

## Using in Angular Applications

In your Angular app (no special setup required):

```typescript
// app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <h1>My App</h1>
    <product-widget api-base-url="https://api.mybackend.com"></product-widget>
  `
})
export class AppComponent {}
```

In `index.html`:
```html
<script src="https://your-artifactory.com/product-widget/product-widget.js"></script>
```

---

## Using in React Applications

```jsx
function App() {
  return (
    <div>
      <h1>My React App</h1>
      <product-widget api-base-url="https://api.mybackend.com"></product-widget>
    </div>
  );
}
```

---

## Using in Vue Applications

```vue
<template>
  <div>
    <h1>My Vue App</h1>
    <product-widget api-base-url="https://api.mybackend.com"></product-widget>
  </div>
</template>
```

---

## Connecting to Your Backend

The widget is designed to connect to your own backend API. To enable this:

1. Set the `api-base-url` attribute to your backend URL
2. Your backend should expose: `GET /api/products`

Expected API response format:

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "image": "https://your-cdn.com/image.jpg",
    "category": "Category"
  }
]
```

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
ng serve

# Build for production (as web component)
node build-elements.js

# Test the built widget
open dist/product-widget/test.html
```

---

## Browser Support

- Chrome 67+
- Firefox 63+
- Safari 10.1+
- Edge 79+
