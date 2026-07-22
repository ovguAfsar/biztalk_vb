import { Routes } from '@angular/router';

import { adminGuard } from './core/guards/admin.guard';
import { roleSelectedGuard } from './core/guards/role-selected.guard';
import { pendingMappingChangesGuard } from './features/mappings/create-mapping-page/pending-mapping-changes.guard';
import { pendingVisualMappingChangesGuard } from './features/mappings/visual-mapping-page/pending-visual-mapping-changes.guard';
import { RoleSelectionPageComponent } from './features/auth/role-selection-page/role-selection-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { CreateMappingPageComponent } from './features/mappings/create-mapping-page/create-mapping-page.component';
import { MappingDetailsPageComponent } from './features/mappings/mapping-details-page/mapping-details-page.component';
import { MappingTestPageComponent } from './features/mappings/mapping-test-page/mapping-test-page.component';
import { MappingOutputPageComponent } from './features/mappings/mapping-output-page/mapping-output-page.component';
import { VisualMappingPageComponent } from './features/mappings/visual-mapping-page/visual-mapping-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: RoleSelectionPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent,
    canActivate: [roleSelectedGuard]
  },
  {
    path: 'mappings/:mappingId/view',
    component: MappingDetailsPageComponent,
    canActivate: [roleSelectedGuard]
  },
  {
    path: 'mappings/create',
    component: CreateMappingPageComponent,
    canActivate: [adminGuard],
    canDeactivate: [pendingMappingChangesGuard]
  },
  {
    path: 'mappings/:mappingId/edit',
    component: CreateMappingPageComponent,
    canActivate: [adminGuard],
    canDeactivate: [pendingMappingChangesGuard]
  },
  {
    path: 'mappings/:mappingId/map',
    component: VisualMappingPageComponent,
    canActivate: [adminGuard],
    canDeactivate: [pendingVisualMappingChangesGuard]
  },
  {
    path: 'mappings/:mappingId/test',
    component: MappingTestPageComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'mappings/:mappingId/output',
    component: MappingOutputPageComponent,
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
