import {Injectable} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {UserModelService} from "../services/user-model/user-model.service";


@Injectable()

export class AuthenticationGuard implements CanActivate {


  constructor(private _currentUser:UserModelService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot, ): Observable<boolean> | Promise<boolean> | boolean {
    return this._currentUser.getIsUserLoggedIn();
  }
}
