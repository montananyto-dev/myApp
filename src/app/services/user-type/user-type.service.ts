import { Injectable } from '@angular/core';

@Injectable()
export class UserTypeService {

  public userTypes;

  constructor() { }

  setUserType(userType) {
    this.userTypes = userType;

  }

  getUserType() {
    return this.userTypes;
  }
}
