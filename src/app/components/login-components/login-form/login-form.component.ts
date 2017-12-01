import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


import { UserService } from '../../../services/user/user.service';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public apiUrl = 'http://slim.kingstonse.org/view/user';
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

      if (element['first_name'] === this.inputUserName && element['password'] === this.inputPassword) {
        this.user.setCurrentUser(this.inputUserName);
        this.user.setUserLoggedIn();
        this.router.navigateByUrl('/home');


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


