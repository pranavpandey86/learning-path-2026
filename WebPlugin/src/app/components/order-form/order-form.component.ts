import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';

export interface OrderFormData {
  product: Product;
  machine: string;
  version: string;
  approver: string;
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<OrderFormData>();

  formData = {
    machine: '',
    version: '',
    approver: ''
  };

  // Mock dropdown options - these can be customized
  machines = [
    { value: 'windows-laptop', label: 'Windows Laptop' },
    { value: 'macbook-pro', label: 'MacBook Pro' },
    { value: 'macbook-air', label: 'MacBook Air' },
    { value: 'desktop-workstation', label: 'Desktop Workstation' },
    { value: 'virtual-machine', label: 'Virtual Machine' }
  ];

  versions = [
    { value: 'latest', label: 'Latest Version' },
    { value: 'stable', label: 'Stable Release' },
    { value: 'lts', label: 'Long Term Support (LTS)' },
    { value: 'beta', label: 'Beta Version' },
    { value: 'legacy', label: 'Legacy Version' }
  ];

  approvers = [
    { value: 'manager-1', label: 'John Smith (Direct Manager)' },
    { value: 'manager-2', label: 'Jane Doe (Team Lead)' },
    { value: 'director-1', label: 'Robert Johnson (Director)' },
    { value: 'it-admin', label: 'IT Administrator' },
    { value: 'procurement', label: 'Procurement Team' }
  ];

  onBack(): void {
    this.close.emit();
  }

  isFormValid(): boolean {
    return !!this.formData.machine && !!this.formData.version && !!this.formData.approver;
  }

  onSubmit(): void {
    if (this.isFormValid() && this.product) {
      this.submit.emit({
        product: this.product,
        machine: this.formData.machine,
        version: this.formData.version,
        approver: this.formData.approver
      });
    }
  }
}
