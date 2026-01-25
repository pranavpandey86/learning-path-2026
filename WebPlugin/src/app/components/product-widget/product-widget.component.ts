import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-product-widget',
  standalone: true,
  imports: [CommonModule, ProductGridComponent, PaginationComponent, SidebarComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      
      <main class="main-content">
        <div class="product-widget">
          <header class="widget-header">
            <h2 class="widget-title">
              <span class="title-icon">🛒</span>
              Tech Accessories
            </h2>
            <p class="widget-subtitle">Discover our premium selection of desktop and tech accessories</p>
          </header>
          
          <div class="widget-content" *ngIf="!loading; else loadingTemplate">
            <app-product-grid [products]="currentProducts"></app-product-grid>
            
            <app-pagination 
              [currentPage]="currentPage" 
              [totalPages]="totalPages"
              (pageChange)="onPageChange($event)">
            </app-pagination>
          </div>
          
          <ng-template #loadingTemplate>
            <div class="loading-container">
              <div class="loading-spinner"></div>
              <p>Loading products...</p>
            </div>
          </ng-template>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-layout {
      display: flex;
      min-height: 100vh;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    :host ::ng-deep app-sidebar {
      position: sticky;
      top: 0;
      height: 100vh;
      flex-shrink: 0;
    }

    :host ::ng-deep app-sidebar .sidebar {
      height: 100%;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      min-height: 100vh;
      overflow-y: auto;
      background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%);
    }

    .product-widget {
      max-width: 1200px;
      margin: 0 auto;
      padding: 32px;
    }
    
    .widget-header {
      text-align: center;
      margin-bottom: 48px;
    }
    
    .widget-title {
      font-size: 36px;
      font-weight: 800;
      color: #1a1a2e;
      margin: 0 0 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    
    .title-icon {
      font-size: 40px;
    }
    
    .widget-subtitle {
      font-size: 18px;
      color: #6c757d;
      margin: 0;
    }
    
    .widget-content {
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 0;
      color: #6c757d;
    }
    
    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid #e9ecef;
      border-top-color: #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Responsive: hide sidebar on mobile */
    @media (max-width: 768px) {
      .app-layout {
        flex-direction: column;
      }
      
      :host ::ng-deep .sidebar {
        width: 100%;
        min-width: 100%;
        max-height: 300px;
      }
    }
  `]
})
export class ProductWidgetComponent implements OnInit, OnChanges {
  @Input() apiBaseUrl: string = '';
  @Input() itemsPerPage: number = 8;

  products: Product[] = [];
  currentProducts: Product[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  loading: boolean = true;

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
    // Scroll to top of widget
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
