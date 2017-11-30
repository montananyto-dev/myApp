import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


import { UserService } from '../../../services/users/user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  public apiUrl = 'http://slim.kingstonse.org/home/users';
  userdataJson: any;
  displayUsers: boolean;

  constructor(private router: Router, private user: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

showUsers() {
this.displayUsers = !this.displayUsers;
}

  getAllUsers() {
    return this.http.get(this.apiUrl).subscribe(object => {
      this.userdataJson = object;
      this.user.setAllUsers(this.userdataJson);
      console.log(this.userdataJson);
    });
  }
}
