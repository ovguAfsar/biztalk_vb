import { CanDeactivateFn } from '@angular/router';

import { CreateMappingPageComponent } from './create-mapping-page.component';

export const pendingMappingChangesGuard: CanDeactivateFn<CreateMappingPageComponent> = component =>
  component.canLeavePage();
