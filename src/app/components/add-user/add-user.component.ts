import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { UserService } from '../../services/users/user.service';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public apiUrl = "http://slim.kingstonse.org/home/add/users";

  allusers = this.user.setAllUsers;
  
  constructor(private router: Router, private user: UserService, private http: Http) { }

  ngOnInit() {
    
  }

  addUser = function(newUser){

    console.log(JSON.stringify(newUser));

   return this.http.post(this.apiUrl, JSON.stringify(newUser), 
    {headers:{
      'Accept':'application/json',
      'Content-Type' : 'application/json'
  }}).subscribe
    (data=>{
      console.log(data);},
      err=>{
        console.log("Error occured");
      }
    );
  }
}
