import {Component, OnInit} from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import { FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {HttpClient} from "@angular/common/http";

import {UserService} from "../../../services/admin-services/user/user.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public show: boolean = false;
  projects: any;
  users: any;
  projectForm;
  user_id = this._currentUser.getUser_id();
  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();
  user_full_name = this.user_first_name + " " + this.user_last_name;
  addProjectApi = "http://slim.kingstonse.org/add/project";
  button_class = "fa fa-plus";
  numberOfTeamMembers = 0;
  projectInserted:Boolean = false;

  ngOnInit() {
    this.retrieveProjects();
    this.retrieveUsers();
  }

  constructor(private project: UserProjectService, private formBuilder: FormBuilder, private _currentUser: UserModelService, private http: HttpClient,
              private user: UserService) {

    this.projectForm = this.formBuilder.group({
      projectName: new FormControl('',Validators.required),
      projectDescription: new FormControl('',Validators.required),
      projectDueDate: new FormControl('',Validators.required),
      projectDuration: new FormControl('',Validators.required),
      projectCreator: new FormControl('',Validators.required),
      teamMembers: this.formBuilder.array([],Validators.required),
      userId: new FormControl()
    })
  }

  toggle() {
    this.show = !this.show;
    if (this.show) {
      this.button_class = "fa fa-minus"
    } else {
      this.button_class = "fa fa-plus"
    }
  }

  initModuleRow(){
    return this.formBuilder.group({
      teamMemberName: ['', Validators.required],
      teamMemberId: [''],
    });

  }

  deleteTeamMemberForm(index: number) {
    const control = <FormArray>this.projectForm.controls['teamMembers'];
    control.removeAt(index);
    this.numberOfTeamMembers = this.numberOfTeamMembers - 1;
  }

  addTeamMemberForm(){

      const control = <FormArray>this.projectForm.controls['teamMembers'];
      control.push(this.initModuleRow());
      this.numberOfTeamMembers = this.numberOfTeamMembers + 1;
      console.log(this.numberOfTeamMembers);

  }

  searchUserName(userValue){

    for(var i=0; i < this.users.length; i++){

      if(userValue.toLowerCase().contains(this.users[i].user_first_name+ " "+this.users[i].user_last_name)){
        console.log(this.users[i].user_first_name+ " "+this.users[i].user_last_name);
      }
      }
    }

  onSubmit(dataForm) {

    if (this.projectForm.valid) {
      this.http.post(this.addProjectApi, JSON.stringify(dataForm),
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          }
        }).subscribe
      (data => {

        console.log(data);
        this.projectForm.reset();
        this.projectInserted = true;

      }, err => {
        console.error(err);
      });
    }
  }

  retrieveProjects() {
    this.project.getProjectByUserId().subscribe(data => {
      this.projects = data;
    })
  }

  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    })

  }

}
