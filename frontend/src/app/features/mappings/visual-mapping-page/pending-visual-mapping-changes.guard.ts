import { CanDeactivateFn } from '@angular/router';

import { VisualMappingPageComponent } from './visual-mapping-page.component';

export const pendingVisualMappingChangesGuard: CanDeactivateFn<VisualMappingPageComponent> = component =>
  component.canLeavePage();
