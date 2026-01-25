import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductTileComponent } from '../product-tile/product-tile.component';

@Component({
    selector: 'app-product-grid',
    standalone: true,
    imports: [CommonModule, ProductTileComponent],
    template: `
    <div class="product-grid">
      <app-product-tile 
        *ngFor="let product of products" 
        [product]="product">
      </app-product-tile>
    </div>
  `,
    styles: [`
    .product-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      padding: 0;
    }
    
    @media (max-width: 1200px) {
      .product-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    
    @media (max-width: 900px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 600px) {
      .product-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProductGridComponent {
    @Input() products: Product[] = [];
}
