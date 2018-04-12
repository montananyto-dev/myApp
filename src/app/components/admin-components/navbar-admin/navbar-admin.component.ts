import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();


  constructor(private _currentUser:UserModelService,private router:Router) { }

  ngOnInit() {

  }

  //
  // navigateToHome(){
  //   this.router.navigateByUrl('home');
  //
  // }
  //
  // navigateToProfile(){
  //   this.router.navigateByUrl('admin/profile');
  // }

  adminLogout(){
    this._currentUser.setIsUserLoggedIn(false);
    this.router.navigateByUrl('login');
    location.reload();
  }

}
