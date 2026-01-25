import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-product-tile',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="product-tile">
      <div class="product-image-container">
        <img [src]="product.image" [alt]="product.name" class="product-image" />
        <span class="product-category">{{ product.category }}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-footer">
          <span class="product-price">\${{ product.price | number:'1.2-2' }}</span>
          <button class="view-details-btn">View Details</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .product-tile {
      background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .product-tile:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
    
    .product-image-container {
      position: relative;
      padding: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 160px;
    }
    
    .product-image {
      width: 100px;
      height: 100px;
      object-fit: contain;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
    }
    
    .product-category {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(255, 255, 255, 0.9);
      color: #667eea;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .product-info {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .product-name {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 700;
      color: #1a1a2e;
      line-height: 1.3;
    }
    
    .product-description {
      margin: 0 0 16px 0;
      font-size: 13px;
      color: #6c757d;
      line-height: 1.5;
      flex: 1;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .product-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: auto;
    }
    
    .product-price {
      font-size: 22px;
      font-weight: 800;
      color: #667eea;
    }
    
    .view-details-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 25px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .view-details-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  `]
})
export class ProductTileComponent {
    @Input() product!: Product;
}
