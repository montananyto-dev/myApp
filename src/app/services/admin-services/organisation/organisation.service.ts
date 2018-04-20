import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrganisationService {

  public organisations;
  organisationApi = 'http://slim.kingstonse.org/view/organisation';
  organisationNameByIdApi = 'http://slim.kingstonse.org/view/user/organisationName/';

  constructor(private http: HttpClient) { }

  getOrganisations(): Observable<any> {
    return this.http.get(this.organisationApi);
  }

  getOrganisationNameById(organisationID){
    return this.http.get(this.organisationNameByIdApi+organisationID);
  }
}
