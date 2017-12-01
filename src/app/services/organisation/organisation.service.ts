import { Injectable } from '@angular/core';

@Injectable()
export class OrganisationService {

  public organisations;

  constructor() { }

  setOrganisations(organisation) {
    this.organisations = organisation;

  }
  getOrganisations() {
    return this.organisations;
  }
}
