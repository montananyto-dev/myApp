import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit {

  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();


  constructor(private _currentUser:UserModelService,private router:Router) { }

  ngOnInit() {

  }


  navigateToDashboard(){
    this.router.navigateByUrl('dashboard');
  }

  navigateToProfile(){
    this.router.navigateByUrl('user/profile');
  }

  logoutUser(){
    this._currentUser.setIsUserLoggedIn(false);
    this.router.navigateByUrl('');
    location.reload();
  }

}
