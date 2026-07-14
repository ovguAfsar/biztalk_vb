import { Routes } from '@angular/router';

import { pendingMappingChangesGuard } from './features/mappings/create-mapping-page/pending-mapping-changes.guard';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { CreateMappingPageComponent } from './features/mappings/create-mapping-page/create-mapping-page.component';
import { MappingTestPageComponent } from './features/mappings/mapping-test-page/mapping-test-page.component';
import { VisualMappingPageComponent } from './features/mappings/visual-mapping-page/visual-mapping-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent
  },
  {
    path: 'mappings/create',
    component: CreateMappingPageComponent,
    canDeactivate: [pendingMappingChangesGuard]
  },
  {
    path: 'mappings/:mappingId/edit',
    component: CreateMappingPageComponent,
    canDeactivate: [pendingMappingChangesGuard]
  },
  {
    path: 'mappings/:mappingId/map',
    component: VisualMappingPageComponent
  },
  {
    path: 'mappings/:mappingId/test',
    component: MappingTestPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
