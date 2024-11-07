import { Component,inject } from '@angular/core';
import { RouterOutlet,Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private router = inject(Router);

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
