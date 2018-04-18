import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectObjectiveService {

  public projectObjectiveApi = 'http://slim.kingstonse.org/view/objective/';

  constructor(private http: HttpClient) {
  }

  getObjectiveByProjectId(projectID: string): Observable<any> {
    return this.http.get(this.projectObjectiveApi + projectID);
  }
}

