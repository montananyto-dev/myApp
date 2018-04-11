import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  userName = this._currentUser.getUser_first_name();

  constructor(private _currentUser:UserModelService,private router:Router) { }

  ngOnInit() {

  }

  logout(){
    console.log("called");
    this._currentUser.setIsUserLoggedIn(false);
    this.router.navigateByUrl('');
  }

}
