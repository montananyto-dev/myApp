import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserTypeService {

  public userTypes;
  public userTypeApi = 'http://slim.kingstonse.org/view/usertype';


  constructor(private http: HttpClient) { }

  getAllUserTypes(): Observable<any> {
    return this.http.get(this.userTypeApi);
  }

  setUserType(userType) {
    this.userTypes = userType;

  }

  // getUserType() {
  //   return this.userTypes;
  // }
}
