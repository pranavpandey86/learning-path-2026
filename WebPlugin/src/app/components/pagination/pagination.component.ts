import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="pagination">
      <button 
        class="page-btn prev-btn" 
        [disabled]="currentPage === 1"
        (click)="goToPage(currentPage - 1)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        Previous
      </button>
      
      <div class="page-numbers">
        <button 
          *ngFor="let page of pages" 
          class="page-number"
          [class.active]="page === currentPage"
          (click)="goToPage(page)">
          {{ page }}
        </button>
      </div>
      
      <button 
        class="page-btn next-btn" 
        [disabled]="currentPage === totalPages"
        (click)="goToPage(currentPage + 1)">
        Next
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  `,
    styles: [`
    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 32px 0;
    }
    
    .page-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 30px;
      font-size: 14px;
      font-weight: 600;
      color: #495057;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .page-btn:hover:not(:disabled) {
      border-color: #667eea;
      color: #667eea;
      transform: translateX(-2px);
    }
    
    .next-btn:hover:not(:disabled) {
      transform: translateX(2px);
    }
    
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    
    .page-numbers {
      display: flex;
      gap: 8px;
    }
    
    .page-number {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      color: #495057;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .page-number:hover {
      border-color: #667eea;
      color: #667eea;
    }
    
    .page-number.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-color: transparent;
      color: white;
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
  `]
})
export class PaginationComponent {
    @Input() currentPage: number = 1;
    @Input() totalPages: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    get pages(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.pageChange.emit(page);
        }
    }
}
