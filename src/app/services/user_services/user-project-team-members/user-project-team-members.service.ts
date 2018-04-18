import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserProjectTeamMembersService {

  public projectTeamMemberApi = 'http://slim.kingstonse.org/view/teamMembers/';

  constructor(private http: HttpClient) {}

  getTeamMembersByProjectId(projectID:string): Observable<any>{
    return this.http.get(this.projectTeamMemberApi + projectID);
  }

}

