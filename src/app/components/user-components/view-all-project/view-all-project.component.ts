import { Component, OnInit } from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";

@Component({
  selector: 'app-view-project',
  templateUrl: './view-all-project.component.html',
  styleUrls: ['./view-all-project.component.css']
})
export class ViewAllProjectComponent implements OnInit {


  projects:JSON;

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
