import {Component, OnInit} from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {Form, FormBuilder, FormControl} from "@angular/forms";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {HttpClient} from "@angular/common/http";
import * as url from "url";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public show: boolean = false;
  projects;
  projectForm;
  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();
  user_id = this._currentUser.getUser_id();
  user_full_name = this.user_first_name + " " + this.user_last_name;
  addProjectApi = "http://slim.kingstonse.org/add/project";


  ngOnInit() {
    this.retrieveProjects();
  }


  constructor(private project: UserProjectService, private formBuilder: FormBuilder, private _currentUser: UserModelService, private http: HttpClient) {

    this.projectForm = this.formBuilder.group({

      projectName: new FormControl(),
      projectDescription: new FormControl(),
      projectDueDate: new FormControl(),
      projectDuration: new FormControl(),
      projectCreator: new FormControl(),
      userId: new FormControl()
    })

  }

  toggle() {

    this.show = !this.show;

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

        this.projectForm.reset();

      }, err => {
        console.error(err);
      });
    }
  }

  retrieveProjects() {
    this.project.getProject().subscribe(data => {
      this.projects = data;
    })
  }
}
