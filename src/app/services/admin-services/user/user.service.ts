import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class UserService {

  public userApi = 'http://slim.kingstonse.org/view/user';

  constructor(private http: HttpClient) {

  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.userApi);
  }
}
