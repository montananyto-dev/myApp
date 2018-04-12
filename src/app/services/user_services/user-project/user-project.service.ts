import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {UserModelService} from "../user-model/user-model.service";

@Injectable()
export class UserProjectService {

  public userApi = 'http://slim.kingstonse.org/view/project';
  public user_id = this._currentUser.getUser_id();

  constructor(private http: HttpClient,private _currentUser:UserModelService) {

  }
  getProject(): Observable<any> {
    return this.http.get(this.userApi+"/"+this.user_id);
  }

}
