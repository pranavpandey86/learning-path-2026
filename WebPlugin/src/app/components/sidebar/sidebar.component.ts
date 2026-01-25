import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DeviceInfo {
    name: string;
    type: string;
    os: string;
    storage: {
        total: string;
        used: string;
        available: string;
        percentage: number;
    };
}

interface UserInfo {
    name: string;
    email: string;
    avatar: string;
    role: string;
    department: string;
    lastLogin: string;
}

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <aside class="sidebar">
      <!-- User Profile Section -->
      <div class="sidebar-section user-profile">
        <div class="avatar">
          <span class="avatar-initials">{{ getInitials(user.name) }}</span>
        </div>
        <div class="user-info">
          <h3 class="user-name">{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
          <span class="user-role">{{ user.role }}</span>
        </div>
      </div>

      <!-- Device Section -->
      <div class="sidebar-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
          Selected Device
        </h4>
        <div class="device-card">
          <div class="device-header">
            <span class="device-name">{{ device.name }}</span>
            <span class="device-type">{{ device.type }}</span>
          </div>
          <p class="device-os">{{ device.os }}</p>
        </div>
      </div>

      <!-- Storage Section -->
      <div class="sidebar-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
          Storage
        </h4>
        <div class="storage-info">
          <div class="storage-bar">
            <div class="storage-used" [style.width.%]="device.storage.percentage"></div>
          </div>
          <div class="storage-details">
            <span class="storage-label">{{ device.storage.used }} used of {{ device.storage.total }}</span>
            <span class="storage-available">{{ device.storage.available }} available</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="sidebar-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 20V10"></path>
            <path d="M18 20V4"></path>
            <path d="M6 20v-4"></path>
          </svg>
          Quick Stats
        </h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-value">24</span>
            <span class="stat-label">Apps Installed</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">7</span>
            <span class="stat-label">Pending Updates</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">12</span>
            <span class="stat-label">Downloads</span>
          </div>
          <div class="stat-item">
            <span class="stat-value">3</span>
            <span class="stat-label">Favorites</span>
          </div>
        </div>
      </div>

      <!-- Department Info -->
      <div class="sidebar-section">
        <h4 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Organization
        </h4>
        <div class="org-info">
          <div class="org-item">
            <span class="org-label">Department</span>
            <span class="org-value">{{ user.department }}</span>
          </div>
          <div class="org-item">
            <span class="org-label">Last Login</span>
            <span class="org-value">{{ user.lastLogin }}</span>
          </div>
        </div>
      </div>
    </aside>
  `,
    styles: [`
    .sidebar {
      width: 280px;
      min-width: 280px;
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      overflow-y: auto;
      border-right: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-section {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1rem;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .avatar-initials {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
    }

    .user-info {
      flex: 1;
      min-width: 0;
    }

    .user-name {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-email {
      margin: 0.25rem 0;
      font-size: 0.75rem;
      opacity: 0.8;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .user-role {
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.75rem 0;
      font-size: 0.85rem;
      font-weight: 600;
      color: #a0aec0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .section-icon {
      width: 16px;
      height: 16px;
    }

    .device-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      padding: 0.75rem;
    }

    .device-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
    }

    .device-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .device-type {
      font-size: 0.7rem;
      background: #667eea;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }

    .device-os {
      margin: 0;
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .storage-bar {
      height: 8px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    .storage-used {
      height: 100%;
      background: linear-gradient(90deg, #667eea, #764ba2);
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .storage-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
    }

    .storage-label {
      opacity: 0.8;
    }

    .storage-available {
      color: #68d391;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .stat-item {
      background: rgba(255, 255, 255, 0.05);
      padding: 0.75rem;
      border-radius: 8px;
      text-align: center;
    }

    .stat-value {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 0.7rem;
      opacity: 0.7;
    }

    .org-info {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .org-item {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
    }

    .org-label {
      opacity: 0.7;
    }

    .org-value {
      font-weight: 500;
    }
  `]
})
export class SidebarComponent {
    user: UserInfo = {
        name: 'Pranav Pandey',
        email: 'pranav.pandey@company.com',
        avatar: '',
        role: 'Software Engineer',
        department: 'Engineering',
        lastLogin: 'Today, 2:30 PM'
    };

    device: DeviceInfo = {
        name: 'MacBook Pro',
        type: 'Laptop',
        os: 'macOS Sonoma 14.2',
        storage: {
            total: '512 GB',
            used: '324 GB',
            available: '188 GB',
            percentage: 63
        }
    };

    getInitials(name: string): string {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    }
}
