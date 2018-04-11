import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserModelService} from "../services/user_services/user-model/user-model.service";


@Injectable()

export class AuthenticationGuard implements CanActivate {


  constructor(private _currentUser:UserModelService, private router:Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<boolean> | Promise<boolean> | boolean {

    if(this._currentUser.getIsUserLoggedIn() === false){

      this.router.navigateByUrl('');
    }

    return this._currentUser.getIsUserLoggedIn();

  }
}
