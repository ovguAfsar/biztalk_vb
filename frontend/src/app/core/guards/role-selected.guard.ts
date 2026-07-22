import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RoleService } from '../services/role.service';

export const roleSelectedGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  return roleService.hasRole()
    ? true
    : router.createUrlTree(['/login']);
};
