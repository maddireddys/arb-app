import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.loggedinUser;
        if (currentUser) {
            // authorised so return true
            console.log(JSON.stringify(currentUser));
            return true;
        }

        // not logged in so redirect to login page with the return url
        console.log(state.url+"....");
        if(state.url === "/") {
            this.router.navigate(['/login']);
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        }
        return false;
    }
}