import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModelService} from "../user-model/user-model.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectGoalService {

  public projectGoalApi = 'http://slim.kingstonse.org/view/goal/';

  public user_id = this._currentUser.getUser_id();

  constructor(private http: HttpClient,private _currentUser:UserModelService) {

  }


  getGoalByProjectId(projectID:string): Observable<any>{
    return this.http.get(this.projectGoalApi + projectID);
  }

}

