import { Routes } from '@angular/router';

import { CreateMappingPageComponent } from './features/mappings/create-mapping-page/create-mapping-page.component';
import { MappingTestPageComponent } from './features/mappings/mapping-test-page/mapping-test-page.component';
import { VisualMappingPageComponent } from './features/mappings/visual-mapping-page/visual-mapping-page.component';
import { SourceMappingPageComponent } from './features/mappings/source-mapping-page/source-mapping-page.component';
import { TargetMappingPageComponent } from './features/mappings/target-mapping-page/target-mapping-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mappings/create'
  },
  {
    path: 'mappings/create',
    component: CreateMappingPageComponent
  },
  {
    path: 'mappings/:mappingId/source',
    component: SourceMappingPageComponent
  },
  {
    path: 'mappings/:mappingId/target',
    component: TargetMappingPageComponent
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
    redirectTo: 'mappings/create'
  }
];
