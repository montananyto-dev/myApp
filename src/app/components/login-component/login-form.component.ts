import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {UserService} from '../../services/admin-services/user/user.service';
import {UserModelService} from "../../services/user_services/user-model/user-model.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public usersDataJson: any;
  private inputUserName: string;
  private inputPassword: string;
  private userTypeId:number;

  constructor(private router: Router, private userService: UserService, private _currentUser: UserModelService) {

  }

  ngOnInit() {
    this.retrieveUsers();
  }

  loginUser(event) {

    event.preventDefault();
    this.inputUserName = event.target.elements[0].value;
    this.inputPassword = event.target.elements[1].value;

    this.usersDataJson.forEach(element => {

      if (element['user_first_name'] === this.inputUserName && element['user_password'] === this.inputPassword) {

        this._currentUser.setUser_id(Number(element['user_id']));
        this._currentUser.setOrganisation_id(Number(element['organisation_id']));
        this._currentUser.setUser_type_id(Number(element['user_type_id']));
        this._currentUser.setUser_first_name(element['user_first_name']);
        this._currentUser.setUser_last_name(element['user_last_name']);
        this._currentUser.setUser_password(element['user_password']);
        this._currentUser.setUser_email(element['user_email']);
        this._currentUser.setUser_phone_number(element['user_phone_number']);
        this._currentUser.setUser_department(element['user_department']);
        this._currentUser.setUser_about_me(element['user_about_me']);
        this._currentUser.setUser_date_of_birth(element['user_date_of_birth']);
        this._currentUser.setIsUserLoggedIn(true);

        this.userTypeId = this._currentUser.getUser_type_id();

        if (this.userTypeId.toString() === "3") {

          this.router.navigateByUrl('home');

        } else {

          this.router.navigateByUrl('dashboard');

        }
      } else {
        return ErrorEvent;
      }
    });
  }

  retrieveUsers() {

    this.userService.getAllUsers().subscribe(data => {
      this.usersDataJson = data;

    })
  };

}


