import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit {

  profileForm;

  public user_first_name = this.currentUser.getUser_first_name();
  public user_last_name = this.currentUser.getUser_last_name();
  public user_email = this.currentUser.getUser_email();
  public user_phone_number = this.currentUser.getUser_phone_number();
  public user_about_me = this.currentUser.getUser_about_me();
  public user_date_of_birth = this.currentUser.getUser_date_of_birth();

  constructor(private currentUser:UserModelService,private formBuilder:FormBuilder) {

    this.profileForm = this.formBuilder.group({

      firstName: new FormControl('', Validators.pattern('[a-zA-Z]{2,30}$')), // input field that can contain only letters (no numbers or special characters) with a min 2 and max 30
      lastName: new FormControl('', Validators.pattern('[a-zA-Z]{2,30}$')),// input field that can contain only letters (no numbers or special characters) with a min 2 and max 30
      email: new FormControl('', Validators.email),
      dateOfBirth: new FormControl('', Validators.pattern('')),
      aboutMe: new FormControl('',Validators.required),
      phoneNumber: new FormControl('', Validators.pattern('^[0-9()-]+$'))
    })


  }

  ngOnInit() {

  }

  onSubmit(){

  }

}
