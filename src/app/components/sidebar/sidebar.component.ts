import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        Tools
      </div>
      <div class="sidebar-content">
        <a href="#" class="sidebar-item active">
          <span class="icon">📊</span>
          Sentiment Analysis
        </a>
        <a href="#" class="sidebar-item">
          <span class="icon">📈</span>
          Statistics
        </a>
        <a href="#" class="sidebar-item">
          <span class="icon">⚙️</span>
          Settings
        </a>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      background: #f8f9fa;
      height: calc(100vh - 64px);
      border-right: 1px solid #dee2e6;
    }

    .sidebar-header {
      padding: 1rem;
      font-weight: 500;
      border-bottom: 1px solid #dee2e6;
    }

    .sidebar-content {
      padding: 1rem 0;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: #495057;
      text-decoration: none;
      transition: background 0.2s;
      gap: 0.5rem;
    }

    .sidebar-item:hover {
      background: #e9ecef;
    }

    .sidebar-item.active {
      background: #e9ecef;
      color: #2c3e50;
      font-weight: 500;
    }

    .icon {
      font-size: 1.25rem;
    }
  `]
})
export class SidebarComponent {}