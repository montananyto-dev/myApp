import { Component, OnInit } from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {Form, FormBuilder, FormControl} from "@angular/forms";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public show:boolean = false;
  projects;
  projectForm;
  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();
  user_id = this._currentUser.getUser_id();


  ngOnInit() {
    this.retrieveProjects();
  }


  constructor(private project: UserProjectService, private formBuilder: FormBuilder, private _currentUser: UserModelService) {

    this.projectForm = this.formBuilder.group({

      projectName: new FormControl(),
      projectDescription: new FormControl(),
      projectDueDate: new FormControl(),
      projectDuration: new FormControl(),
      projectCreator: new FormControl()
    })

  }

  toggle() {

    this.show = !this.show;

  }












  retrieveProjects() {
    this.project.getProject().subscribe(data => {
      this.projects = data;
    })
  }
}
