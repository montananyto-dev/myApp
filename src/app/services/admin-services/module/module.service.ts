import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ModuleService {

  public moduleApi = 'http://slim.kingstonse.org/view/module';
  public moduleByOrganisationIdApi = 'http://slim.kingstonse.org/view/module/organisation/';
  private moduleByCourseId = 'http://slim.kingstonse.org/return/specific/module/';

  constructor(private http: HttpClient) {
  }

  getAllModules(): Observable<any> {
    return this.http.get(this.moduleApi);
  }

  getModuleByOrganisationId(organisationID): Observable<any> {
    return this.http.get(this.moduleByOrganisationIdApi + organisationID );
  }

  getModuleByCourseIds(courseId): Observable<any> {
    return this.http.get(this.moduleByCourseId + courseId );
  }
}
