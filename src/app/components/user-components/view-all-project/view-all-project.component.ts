
import { Component, OnInit } from '@angular/core';
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-view-project',
  templateUrl: './view-all-project.component.html',
  styleUrls: ['./view-all-project.component.css']
})
export class ViewAllProjectComponent implements OnInit {


  projects:JSON;

  constructor(private project:UserProjectService,private router:Router) { }

  ngOnInit() {
    this.retrieveProjects();
  }

  redirectTo(projectID){
    window.localStorage.setItem('currentProjectId',projectID);
    this.router.navigate(['view/project/details',projectID])
  }


  retrieveProjects() {
    this.project.getProjectByUserId().subscribe(data => {
      this.projects = data;
    })
  }
}
