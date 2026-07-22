import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AppRole, RoleService } from '../../../core/services/role.service';

@Component({
  selector: 'app-role-selection-page',
  standalone: true,
  templateUrl: './role-selection-page.component.html',
  styleUrl: './role-selection-page.component.css'
})
export class RoleSelectionPageComponent {
  private readonly roleService = inject(RoleService);
  private readonly router = inject(Router);

  protected continueAs(role: AppRole): void {
    this.roleService.selectRole(role);
    void this.router.navigate(['/']);
  }
}
