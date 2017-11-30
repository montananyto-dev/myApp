import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../services/users/user.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allUsers;
  public displayUsers = false;

  constructor(public user: UserService) {

    this.allUsers = user.getAllUsers();

   }

  ngOnInit() {
  }

  showUsers() {
    this.displayUsers = !this.displayUsers;
  }
}
