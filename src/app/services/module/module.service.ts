import { Injectable } from '@angular/core';

@Injectable()
export class ModuleService {

  public modules;

  constructor() { }

  setModules(organisation) {
    this.modules = organisation;

  }
  getModules() {
    return this.modules;
  }
}
