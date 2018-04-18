import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projectId:string;

  constructor(private route: ActivatedRoute,private project: UserProjectService) {

    this.route.queryParams.subscribe(params => {
      this.projectId = params['projectId'];

      console.log(this.projectId);
    });
  }

  ngOnInit() {
    this.getProjectById();
  }

  getProjectById(){
    this.project.getProjectByProjectId(this.projectId).subscribe(data=>{
      console.log(data);
    });
  }
}
