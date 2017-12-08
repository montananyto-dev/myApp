import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {

  public isUserLoggedIn;
  public users;
  public currentUser;
  public userApi = 'http://slim.kingstonse.org/view/user';

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.userApi);
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setAllUsers(users) {
    this.users = users;

  }
  // getAllUsers() {
  //   return this.users;
  // }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser(user) {
    return this.currentUser;
  }
}
