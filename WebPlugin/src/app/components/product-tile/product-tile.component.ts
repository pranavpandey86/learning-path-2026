import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  @Input() product!: Product;
  @Output() select = new EventEmitter<Product>();

  isFavorite: boolean = false;

  onTileClick(): void {
    this.select.emit(this.product);
  }

  onInfoClick(event: Event): void {
    event.stopPropagation();
    this.select.emit(this.product);
  }

  onFavoriteClick(event: Event): void {
    event.stopPropagation();
    this.isFavorite = !this.isFavorite;
  }
}
