import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductTileComponent } from '../product-tile/product-tile.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductTileComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Output() productSelect = new EventEmitter<Product>();

  onProductSelect(product: Product): void {
    this.productSelect.emit(product);
  }
}
