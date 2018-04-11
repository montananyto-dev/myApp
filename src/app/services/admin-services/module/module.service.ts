import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ModuleService {

  public modules;
  public moduleApi = 'http://slim.kingstonse.org/view/module';

  constructor(private http: HttpClient) { }

  getAllModules(): Observable<any> {
    return this.http.get(this.moduleApi);
  }

  setModules(module) {
    this.modules = module;

  }
  getModules() {
    return this.modules;
  }
}
