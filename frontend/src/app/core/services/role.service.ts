import { Injectable, computed, signal } from '@angular/core';

export type AppRole = 'admin' | 'user';

const ROLE_STORAGE_KEY = 'mapping-studio-role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly selectedRole = signal<AppRole | null>(this.readStoredRole());

  readonly role = this.selectedRole.asReadonly();
  readonly hasRole = computed(() => this.selectedRole() !== null);
  readonly isAdmin = computed(() => this.selectedRole() === 'admin');
  readonly isUser = computed(() => this.selectedRole() === 'user');

  selectRole(role: AppRole): void {
    localStorage.setItem(ROLE_STORAGE_KEY, role);
    this.selectedRole.set(role);
  }

  clearRole(): void {
    localStorage.removeItem(ROLE_STORAGE_KEY);
    this.selectedRole.set(null);
  }

  private readStoredRole(): AppRole | null {
    const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    return storedRole === 'admin' || storedRole === 'user' ? storedRole : null;
  }
}
