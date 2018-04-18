import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ProjectTaskService {

  public projectTaskByProjectIdApi = 'http://slim.kingstonse.org/view/allTasks/';
  public projectTaskByProjectAndStatusIdApi = 'http://slim.kingstonse.org/view/taskByStatus/';
  public projectTaskByProjectIdAndTaskId = 'http://slim.kingstonse.org/view/taskByProjectAndTaskId/';

  constructor(private http: HttpClient) {
  }

  getTaskByProjectId(projectId: string): Observable<any> {
    return this.http.get(this.projectTaskByProjectIdApi + projectId);
  }

  getTaskByProjectIdAndStatusId(projectId: string, statusId: string,): Observable<any> {
    return this.http.get(this.projectTaskByProjectAndStatusIdApi + projectId + "/" + statusId);
  }

  getTaskByProjectIdAndTaskId(projectId: string, taskId: string,): Observable<any> {
    return this.http.get(this.projectTaskByProjectIdAndTaskId + projectId + "/" + taskId);
  }
}
