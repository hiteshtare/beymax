import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // already logged in
        if (route.url[0].path === 'login') {
            if (localStorage.getItem('currentUser')) {
                this.router.navigate(['dashboard']);
                return false;
            } else {
                return true;
            }
        }

        // logged in so return true
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
