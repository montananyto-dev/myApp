import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public isUserLoggedIn;
  public allUsers;
  public currentUser;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
    this.isUserLoggedIn = true;
  }
  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  setAllUsers(users) {
    this.allUsers = users;

  }
  getAllUsers() {
    return this.allUsers;
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  getCurrentUser(user) {
    return this.currentUser;
  }
}
