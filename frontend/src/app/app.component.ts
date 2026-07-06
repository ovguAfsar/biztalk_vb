import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-brand-logo" aria-label="VakıfBank">
      VakıfBank
    </div>
    <router-outlet />
  `
})
export class AppComponent {}
