import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

import {UserService} from '../../../services/user/user.service';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  users;

  constructor(private router: Router, private user: UserService) {
  }
  ngOnInit() {
    this.retrieveUsers();
  }
  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }
<<<<<<< HEAD
// showUsers() {
// this.displayUsers = !this.displayUsers;
// }
=======
>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
}
