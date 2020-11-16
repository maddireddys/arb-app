import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserDetails } from './models/UserDetails';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  currentUser: UserDetails;
    constructor(private router: Router,
      private authService: AuthService) {
      this.authService.user.subscribe(x => this.currentUser = x);
        
    }

    logout() {
      this.authService.logout().pipe(first())
          .subscribe(
              data => {
                  this.router.navigate(['/login']);
              },
              error => {
                  
              });
      }
    
}
