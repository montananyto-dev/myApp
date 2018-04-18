import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ViewTaskCommentsService {

  public projectTaskComment = 'http://slim.kingstonse.org/view/task/comment/';


  constructor(private http: HttpClient) {
  }

  getCommentByTaskId(projectId: string): Observable<any> {
    return this.http.get(this.projectTaskComment + projectId);
  }
}
