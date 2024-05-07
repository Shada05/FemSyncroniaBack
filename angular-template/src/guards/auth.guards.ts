import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router){}

  canActivate():boolean
     {
      const token: string | null = localStorage.getItem('token');
      console.log(token)
      if(token== null){
        this.router.navigateByUrl('/login')
        return false
      }
      return true
      
      // return auth
      // ? token == null
      //   ? this.router.createUrlTree(['login'])
      //   : true
      //   : token != null
      //   ? this.router.createUrlTree(['menu/home'])
      //   :true;

        }
        }