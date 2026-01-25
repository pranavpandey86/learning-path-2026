import { Component } from '@angular/core';
import { ProductWidgetComponent } from './components/product-widget/product-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductWidgetComponent],
  template: `<app-product-widget></app-product-widget>`,
  styles: []
})
export class AppComponent {
  title = 'product-widget';
}
