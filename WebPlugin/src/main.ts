import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef, NgZone } from '@angular/core';
import { appConfig } from './app/app.config';
import { ProductWidgetComponent } from './app/components/product-widget/product-widget.component';
import { AppComponent } from './app/app.component';

// Store the application reference globally to prevent duplicate instantiation
declare global {
  interface Window {
    __PRODUCT_WIDGET_APP__: ApplicationRef | null;
    __PRODUCT_WIDGET_PRODUCTION__: boolean;
    __PRODUCT_WIDGET_REGISTERED__: boolean;
    Zone?: any;
  }
}

// Check if we're in production mode (set by the build script)
const isProduction = window.__PRODUCT_WIDGET_PRODUCTION__ === true;

// Check if Zone.js is already loaded (indicates another Angular app is running)
const isZoneAlreadyLoaded = typeof window.Zone !== 'undefined';

// Function to safely create the custom element
async function registerProductWidget(): Promise<void> {
  // Check if already registered
  if (customElements.get('product-widget') || window.__PRODUCT_WIDGET_REGISTERED__) {
    console.log('[ProductWidget] Custom element already registered, skipping...');
    return;
  }

  // Mark as being registered to prevent race conditions
  window.__PRODUCT_WIDGET_REGISTERED__ = true;

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

    // When integrating with an existing Angular app, use 'noop' zone to avoid conflicts
    const widgetConfig = {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        // Use 'noop' zone when Zone.js is already loaded by host app
        // This prevents the NG0908 error
        ...(isZoneAlreadyLoaded ? [{ provide: NgZone, useValue: new NgZone({ enableLongStackTrace: false }) }] : [])
      ]
    };

    const app = await createApplication(widgetConfig);

    // Store the application reference globally
    window.__PRODUCT_WIDGET_APP__ = app;

    const ProductWidgetElement = createCustomElement(ProductWidgetComponent, {
      injector: app.injector,
    });

    customElements.define('product-widget', ProductWidgetElement);
    console.log('[ProductWidget] Custom element registered successfully');
  } catch (err) {
    console.error('[ProductWidget] Failed to register custom element:', err);
    window.__PRODUCT_WIDGET_REGISTERED__ = false;
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
