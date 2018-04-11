import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class OrganisationService {

  public organisations;
  organisationApi = 'http://slim.kingstonse.org/view/organisation';

  constructor(private http: HttpClient) { }

  getOrganisations(): Observable<any> {
    return this.http.get(this.organisationApi);
  }

  setOrganisations(organisation) {
    this.organisations = organisation;

  }
  // getOrganisations() {
  //   return this.organisations;
  // }
}
