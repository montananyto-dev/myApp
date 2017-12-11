import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


import { UserService } from '../../../services/user/user.service';
import { HttpClient} from '@angular/common/http';
import {OrganisationService} from '../../../services/organisation/organisation.service';
import {ModuleService} from '../../../services/module/module.service';
import {UserTypeService} from '../../../services/user-type/user-type.service';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usersDataJson: any;
  users;
  inputUserName;
  inputPassword;

  constructor(private router: Router, private user: UserService) {
  }

  ngOnInit() {
    this.retrieveUsers();
  }

  loginUser(event) {

    event.preventDefault();
    this.inputUserName = event.target.elements[0].value;
    this.inputPassword = event.target.elements[1].value;

    this.usersDataJson.forEach(element => {

      if (element['first_name'] === this.inputUserName && element['password'] === this.inputPassword) {
        this.user.setCurrentUser(this.inputUserName);
        this.user.setUserLoggedIn();
        this.router.navigateByUrl('/home');
      } else {
        return ErrorEvent;
      }
    });
  }

  retrieveUsers(){

    this.user.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;

    })}

}


