import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  private apiUrl = "http://api/home/users";
  data:any;
  currentUserName;
  currentPassword;


  constructor(private router:Router, private user:UserService,private http: Http) {

    this.getAllUsers();
 
   }

  ngOnInit() {
  }

  loginuser(event){

    event.preventDefault();
    this.currentUserName = event.target.elements[0].value;
    this.currentPassword = event.target.elements[1].value;
    
    this.data.forEach(element => {
      
            if (element['username'] == this.currentUserName && element['password'] == this.currentPassword){
              this.user.setUserLoggedIn();
              this.router.navigate(['home']);
            } else{
              return ErrorEvent;
            }
      });
  }

  getAllUsers(){
    return this.http.get(this.apiUrl).map((res: Response) => res.json()).subscribe(user=>{
      this.data = user;
    });
  }
}
