import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/user/user.service";
import {Form, FormArray, FormArrayName, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DoCheck} from '@angular/core';
import {until} from "selenium-webdriver";
import elementIsDisabled = until.elementIsDisabled;
import {parseHttpResponse} from "selenium-webdriver/http";


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  index: number;
  users: object[] = [];
  usersDataJson: any;

  editUserForm: FormGroup;

  readOnlyBoolean: boolean[] = [];
  saveButton: boolean[] = [];
  editButton: boolean[] = [];
  cancelButton: boolean[] = [];

  requiredBoolean: boolean[] = [];

  currentUser;

  currentUserId;
  currentUserFirstName;
  currentUserLastName;
  currentUserEmail;
  currentUserPhoneNumber;
  currentUserDepartment;

  editUserApi  = "http://slim.kingstonse.org/edit/user";


  constructor(private http: HttpClient, private user: UserService, private formBuilder: FormBuilder) {
    this.editUserForm = this.formBuilder.group({

        userIdForm: this.formBuilder.array([]),
        userFirstNameForm: this.formBuilder.array([]),
        userLastNameForm: this.formBuilder.array([]),
        userEmailForm: this.formBuilder.array([]),
        userPhoneNumberForm: this.formBuilder.array([]),
        userDepartmentForm: this.formBuilder.array([])
      }
    )
  }


  ngOnInit() {
    this.retrieveUsers();

  }

  setFirstName(data) {

    const patchV = (<FormArray>this.editUserForm.controls['userFirstNameForm']).at(0) as FormArray;
    patchV.patchValue(data);
  }

  setLastName(data){
    const patchV = (<FormArray>this.editUserForm.controls['userLastNameForm']).at(0) as FormArray;
    patchV.patchValue(data);

  }

  setEmail(data){
    const patchV = (<FormArray>this.editUserForm.controls['userEmailForm']).at(0) as FormArray;
    patchV.patchValue(data);

  }
  setPhoneNumber(data){

    const patchV = (<FormArray>this.editUserForm.controls['userPhoneNumberForm']).at(0) as FormArray;
    patchV.patchValue(data);

  }
  setDepartment(data){

    const patchV = (<FormArray>this.editUserForm.controls['userDepartmentForm']).at(0) as FormArray;
    patchV.patchValue(data);


  }

  setArrayBoolean() {

    for (let user in this.users) {
      this.readOnlyBoolean.push(true);
      this.saveButton.push(true);
      this.cancelButton.push(true);
      this.editButton.push(false);
      this.requiredBoolean.push(false);
    }
  }

  setCurrentUser() {

    this.currentUserId = this.currentUser.user_id;
    this.currentUserFirstName = this.currentUser.user_first_name;
    this.currentUserLastName = this.currentUser.user_last_name;
    this.currentUserEmail = this.currentUser.user_email;
    this.currentUserPhoneNumber = this.currentUser.user_phone_number;
    this.currentUserDepartment = this.currentUser.user_department;

  }


  resetEditForm() {

    const userId = <FormArray>this.editUserForm.controls['userIdForm'];
    userId.removeAt(0);
    const userFirstName = <FormArray>this.editUserForm.controls['userFirstNameForm'];
    userFirstName.removeAt(0);
    const userLastName = <FormArray>this.editUserForm.controls['userLastNameForm'];
    userLastName.removeAt(0);
    const userEmail = <FormArray>this.editUserForm.controls['userEmailForm'];
    userEmail.removeAt(0);
    const userPhoneNumber = <FormArray>this.editUserForm.controls['userPhoneNumberForm'];
    userPhoneNumber.removeAt(0);
    const userDepartment = <FormArray>this.editUserForm.controls['userDepartmentForm'];
    userDepartment.removeAt(0);


  }

  pushToArray() {

    const userId = <FormArray>this.editUserForm.controls['userIdForm'];
    userId.push(this.formBuilder.control(this.currentUserId, Validators.required));
    const userFirstName = <FormArray>this.editUserForm.controls['userFirstNameForm'];
    userFirstName.push(this.formBuilder.control(this.currentUserFirstName,Validators.required));
    const userLastName = <FormArray>this.editUserForm.controls['userLastNameForm'];
    userLastName.push(this.formBuilder.control(this.currentUserLastName,Validators.required));
    const userEmail = <FormArray>this.editUserForm.controls['userEmailForm'];
    userEmail.push(this.formBuilder.control(this.currentUserEmail,Validators.required));
    const userPhoneNumber = <FormArray>this.editUserForm.controls['userPhoneNumberForm'];
    userPhoneNumber.push(this.formBuilder.control(this.currentUserPhoneNumber,Validators.required));
    const userDepartment = <FormArray>this.editUserForm.controls['userDepartmentForm'];
    userDepartment.push(this.formBuilder.control(this.currentUserDepartment,Validators.required));

  }


  editUser(index, user) {

    this.currentUser = user;
    this.setCurrentUser();
    this.pushToArray();

    this.index = index;
    this.editButton.forEach((item, index) => {
      this.editButton[index] = true;
    });
    this.readOnlyBoolean[index] = false;
    this.saveButton[index] = false;
    this.cancelButton[index] = false;
    this.requiredBoolean[index] = true;

  }


  saveUser(index,dataForm) {

    if(this.editUserForm.invalid){

      console.log('invalid');
    }else {

      this.http.post(this.editUserApi, dataForm,
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          },

        }).subscribe
      (data => {

        //print out the data return by the server
        console.log(data);
        this.resetEditForm();
        this.retrieveUsers();

      }, err => {

        console.log(err);
        console.error("Could not be updated");

      });

      this.readOnlyBoolean[index] = true;
      this.saveButton[index] = true;
      this.editButton[index] = false;
      this.cancelButton[index] = true;
      this.editButton.forEach((item, index) => {
        this.editButton[index] = false;
      });

    }
  }

  cancelUser(index) {

    this.resetEditForm();

    this.readOnlyBoolean[index] = true;
    this.saveButton[index] = true;
    this.editButton[index] = false;
    this.cancelButton[index] = true;
    this.editButton.forEach((item, index) => {
      this.editButton[index] = false;
    });
  }

  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;
      this.setArrayBoolean();
    })
  }
}
