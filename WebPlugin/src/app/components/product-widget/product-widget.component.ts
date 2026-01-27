import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { OrderFormComponent } from '../order-form/order-form.component';

type ViewType = 'products' | 'order';

@Component({
  selector: 'app-product-widget',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, PaginationComponent, OrderFormComponent],
  templateUrl: './product-widget.component.html',
  styleUrl: './product-widget.component.css'
})
export class ProductWidgetComponent implements OnInit, OnChanges {
  @Input() apiBaseUrl: string = '';
  @Input() itemsPerPage: number = 8;

  products: Product[] = [];
  currentProducts: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = true;

  // View state
  currentView: ViewType = 'products';
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['apiBaseUrl'] && this.apiBaseUrl) {
      this.productService.setApiBaseUrl(this.apiBaseUrl);
    }
    if (changes['itemsPerPage']) {
      this.updatePagination();
    }
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.updatePagination();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    this.updateCurrentProducts();
  }

  updateCurrentProducts(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.currentProducts = this.products.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateCurrentProducts();
  }

  onItemsPerPageChange(count: number): void {
    this.itemsPerPage = count;
    this.currentPage = 1;
    this.updatePagination();
  }

  getItemsInfo(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.products.length);
    return `${start}-${end} of ${this.products.length} items`;
  }

  // Navigation methods
  onProductSelect(product: Product): void {
    this.selectedProduct = product;
    this.currentView = 'order';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  goBackToProducts(): void {
    this.currentView = 'products';
    this.selectedProduct = null;
  }

  onOrderSubmit(orderData: any): void {
    console.log('Order submitted:', orderData);
    alert('Request submitted successfully!');
    this.goBackToProducts();
  }
}
