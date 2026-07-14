import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    @if (router.url !== '/') {
      <a class="app-home-link" routerLink="/" aria-label="Ana sayfaya dön">
        <span aria-hidden="true">←</span>
        Ana Sayfa
      </a>
    }
    <div class="app-brand-logo">
      <img
        src="assets/brand/vakifbank-logo-header.png"
        alt="VakıfBank"
      />
    </div>
    <router-outlet />
  `
})
export class AppComponent {
  protected readonly router = inject(Router);
}
