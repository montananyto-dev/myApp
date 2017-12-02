import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';


import {UserService} from '../../../services/user/user.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {UserTypeService} from '../../../services/user-type/user-type.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public apiUrl = 'http://slim.kingstonse.org/view/user';
  public apiUrl2 = 'http://slim.kingstonse.org/view/usertype';
  userdataJson: any;
  // displayUsers: boolean;
  allUsers;
  userTypes;
  userTypedataJson: any;


  constructor(private router: Router, private user: UserService, private http: HttpClient, private userType: UserTypeService) {
  }

  ngOnInit() {

    this.getUsersDetails();
    this.getUsersType();

  }

// showUsers() {
// this.displayUsers = !this.displayUsers;
// }

  getUsersDetails() {
    return this.http.get(this.apiUrl).subscribe(object => {
      this.userdataJson = object;
      this.user.setAllUsers(this.userdataJson);
      this.allUsers = this.user.getAllUsers();
      console.log(this.allUsers);
    });
  }
  getUsersType() {
    return this.http.get(this.apiUrl2).subscribe(object => {
      this.userTypedataJson = object;
      this.userType.setUserType(this.userTypedataJson);
      this.userTypes = this.userType.getUserType();
      console.log(this.userTypes);
    });
  }
}
