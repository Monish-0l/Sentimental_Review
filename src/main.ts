import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { NavbarComponent } from './app/components/navbar/navbar.component';
import { SidebarComponent } from './app/components/sidebar/sidebar.component';
import { ReviewFormComponent } from './app/components/review-form/review-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, ReviewFormComponent],
  template: `
    <div class="app-container">
      <app-navbar></app-navbar>
      <div class="content-container">
        <app-sidebar></app-sidebar>
        <main class="main-content">
          <app-review-form></app-review-form>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f0f2f5;
    }

    .content-container {
      display: flex;
      min-height: calc(100vh - 64px);
    }

    .main-content {
      flex: 1;
      padding: 2rem;
    }
  `]
})
export class App {
  name = 'Review Analyzer';
}

bootstrapApplication(App);