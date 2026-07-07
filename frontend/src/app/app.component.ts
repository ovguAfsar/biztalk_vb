import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-brand-logo">
      <img
        src="assets/brand/vakifbank-logo-header.png"
        alt="VakıfBank"
      />
    </div>
    <router-outlet />
  `
})
export class AppComponent {}
