import { Component, OnInit } from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projects;

  constructor(private project:UserProjectService) { }

  ngOnInit() {
    this.retrieveProjects();
  }
  retrieveProjects() {
    this.project.getProject().subscribe(data => {
      this.projects = data;
    })
  }
}
