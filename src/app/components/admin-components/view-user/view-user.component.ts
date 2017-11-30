import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';


import {UserService} from '../../../services/users/user.service';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public apiUrl = 'http://slim.kingstonse.org/view/users';
  userdataJson: any;
  // displayUsers: boolean;
  allUsers;


  constructor(private router: Router, private user: UserService, private http: HttpClient) {


  }

  ngOnInit() {

    this.getUsersDetails();

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
}
