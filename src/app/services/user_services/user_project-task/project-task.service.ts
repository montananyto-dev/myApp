import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectTaskService {

  public projectTaskByProjectIdApi = 'http://slim.kingstonse.org/view/task/';
  public projectWorkflowStepApi = 'http://slim.kingstonse.org/view/task/';

  constructor(private http: HttpClient) {
  }

  getTaskByProjectID(projectID: string): Observable<any> {
    return this.http.get(this.projectTaskByProjectIdApi + projectID);
  }

  getTaskByProjectIdAndStatusId(projectID: string,statusId: string,): Observable<any> {
    return this.http.get(this.projectWorkflowStepApi + projectID +"/" +statusId);
  }

}
