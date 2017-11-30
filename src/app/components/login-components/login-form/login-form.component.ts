import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


import { UserService } from '../../../services/users/user.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public apiUrl = 'http://slim.kingstonse.org/home/users';
  userdataJson: any;
  inputUserName;
  inputPassword;

  constructor(private router: Router, private user: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  loginUser(event) {

    event.preventDefault();
    this.inputUserName = event.target.elements[0].value;
    this.inputPassword = event.target.elements[1].value;

    this.userdataJson.forEach(element => {

      if (element['username'] === this.inputUserName && element['password'] === this.inputPassword) {
        this.user.setCurrentUser(this.inputUserName);
        this.user.setUserLoggedIn();
        this.router.navigate(['home']);


      } else {
        return ErrorEvent;
      }
    });
  }

  getAllUsers() {
    return this.http.get(this.apiUrl).subscribe(object => {
      this.userdataJson = object;
      this.user.setAllUsers(this.userdataJson);
    });
  }

}


