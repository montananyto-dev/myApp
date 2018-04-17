import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class ProjectWorkflowStepService {

  public projectWorkflowStepApi = 'http://slim.kingstonse.org/view/workflowStep/';

  constructor(private http: HttpClient) {}

  getWorkflowStepByProjectId(projectID:string): Observable<any>{
    return this.http.get(this.projectWorkflowStepApi + projectID);
  }

}














