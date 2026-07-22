import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { RoleService } from '../services/role.service';

export const adminGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  if (!roleService.hasRole()) {
    return router.createUrlTree(['/login']);
  }

  return roleService.isAdmin()
    ? true
    : router.createUrlTree(['/']);
};
