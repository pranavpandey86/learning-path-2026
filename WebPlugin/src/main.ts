import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ProductWidgetComponent } from './app/components/product-widget/product-widget.component';
import { AppComponent } from './app/app.component';

// Check if we're in production mode (set by the build script)
const isProduction = (window as any).__PRODUCT_WIDGET_PRODUCTION__ === true;

if (isProduction) {
  // Production mode - register as custom element
  console.log('[ProductWidget] Registering as custom element...');

  createApplication(appConfig).then((app) => {
    const ProductWidgetElement = createCustomElement(ProductWidgetComponent, {
      injector: app.injector,
    });

    // Only define if not already defined
    if (!customElements.get('product-widget')) {
      customElements.define('product-widget', ProductWidgetElement);
      console.log('[ProductWidget] Custom element registered successfully');
    }
  }).catch((err) => {
    console.error('[ProductWidget] Failed to register custom element:', err);
  });
} else {
  // Development mode - run as normal Angular app
  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}
