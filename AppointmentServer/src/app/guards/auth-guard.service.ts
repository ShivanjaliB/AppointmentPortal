import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log("INSIDE AUTHGUARD")
      const token = localStorage.getItem('user');
      console.log("TOKENN",localStorage.getItem('user'))
      if (state.url == '/login' && token) {
        this.router.navigate(['/auth/dashboard']);
        return true;
      }
      
      if (token) {
        //Authorization logic here
        return true;
      }
      else {
        if (state.url != '/login') {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }
      }
  }
}

