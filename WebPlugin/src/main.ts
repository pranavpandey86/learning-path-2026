import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
import { appConfig } from './app/app.config';
import { ProductWidgetComponent } from './app/components/product-widget/product-widget.component';
import { AppComponent } from './app/app.component';

// Store the application reference globally to prevent duplicate instantiation
declare global {
  interface Window {
    __PRODUCT_WIDGET_APP__: ApplicationRef | null;
    __PRODUCT_WIDGET_PRODUCTION__: boolean;
  }
}

// Check if we're in production mode (set by the build script)
const isProduction = window.__PRODUCT_WIDGET_PRODUCTION__ === true;

// Function to safely create the custom element
async function registerProductWidget(): Promise<void> {
  // Check if already registered
  if (customElements.get('product-widget')) {
    console.log('[ProductWidget] Custom element already registered, skipping...');
    return;
  }

  // Check if we already have an application instance
  if (window.__PRODUCT_WIDGET_APP__) {
    console.log('[ProductWidget] Reusing existing application instance...');
    try {
      const ProductWidgetElement = createCustomElement(ProductWidgetComponent, {
        injector: window.__PRODUCT_WIDGET_APP__.injector,
      });
      customElements.define('product-widget', ProductWidgetElement);
      console.log('[ProductWidget] Custom element registered with existing instance');
      return;
    } catch (err) {
      console.warn('[ProductWidget] Failed to reuse existing instance, creating new one...');
      window.__PRODUCT_WIDGET_APP__ = null;
    }
  }

  try {
    console.log('[ProductWidget] Creating new application instance...');
    const app = await createApplication(appConfig);

    // Store the application reference globally
    window.__PRODUCT_WIDGET_APP__ = app;

    const ProductWidgetElement = createCustomElement(ProductWidgetComponent, {
      injector: app.injector,
    });

    customElements.define('product-widget', ProductWidgetElement);
    console.log('[ProductWidget] Custom element registered successfully');
  } catch (err) {
    console.error('[ProductWidget] Failed to register custom element:', err);
  }
}

if (isProduction) {
  // Production mode - register as custom element
  console.log('[ProductWidget] Initializing in production mode...');
  registerProductWidget();
} else {
  // Development mode - run as normal Angular app
  console.log('[ProductWidget] Initializing in development mode...');
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}
