import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { RoleService } from './core/services/role.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    @if (router.url !== '/' && router.url !== '/login') {
      <a class="app-home-link" routerLink="/" aria-label="Ana sayfaya dön">
        <span aria-hidden="true">←</span>
        Ana Sayfa
      </a>
    }
    @if (roleService.hasRole() && router.url !== '/login') {
      <div class="app-role-controls">
        <span>{{ roleService.isAdmin() ? 'Admin' : 'Kullanıcı' }}</span>
        <button type="button" (click)="changeRole()">Rol Değiştir / Çıkış</button>
      </div>
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
  protected readonly roleService = inject(RoleService);

  protected changeRole(): void {
    this.roleService.clearRole();
    void this.router.navigate(['/login']);
  }
}
