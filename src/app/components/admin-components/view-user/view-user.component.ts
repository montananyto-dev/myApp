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

  // displayUsers: boolean;
  users;

  constructor(private router: Router,
              private user: UserService,
              private http: HttpClient) {

    this.users = this.user.getAllUsers();

  }

  ngOnInit() {

  }

// showUsers() {
// this.displayUsers = !this.displayUsers;
// }
}
