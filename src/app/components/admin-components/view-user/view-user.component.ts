import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

import {UserService} from '../../../services/user/user.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  // displayUsers: boolean;
  users;
  usersDataJson: any;

  constructor(private router: Router, private user: UserService) {
  }
  ngOnInit() {
    this.retrieveUsers();
  }
  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;
    })
  }
// showUsers() {
// this.displayUsers = !this.displayUsers;
// }
}
