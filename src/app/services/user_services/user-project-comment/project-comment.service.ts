import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectCommentService {

  public projectCommentApi = 'http://slim.kingstonse.org/view/comment/';

  constructor(private http: HttpClient) {
  }

  getCommentByProjectId(projectID: string): Observable<any> {
    return this.http.get(this.projectCommentApi + projectID);
  }
}
