import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { User } from '../../interfaces/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  items: User[] = [];
  loggedInUserName: string | null = null; // Store the username of the logged-in user
  private router = inject(Router);
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAllItem().subscribe((data) => {
      this.items = data;
      
      // Get the logged-in user's email from session storage
      const loggedInUserEmail = sessionStorage.getItem('email');
      if (loggedInUserEmail) {
        // Find the user in the items array with the matching email
        const user = this.items.find(item => item.email === loggedInUserEmail);
        console.log(user);
        
        if (user) {
          this.loggedInUserName = user.fullName; // Assuming `username` is the property name
        }
      }
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
