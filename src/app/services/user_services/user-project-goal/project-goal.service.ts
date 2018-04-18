import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectGoalService {

  public projectGoalApi = 'http://slim.kingstonse.org/view/goal/';

  constructor(private http: HttpClient) {
  }

  getGoalByProjectId(projectID: string): Observable<any> {
    return this.http.get(this.projectGoalApi + projectID);
  }
}

