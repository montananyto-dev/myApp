import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projectID:string;

  constructor(private route: ActivatedRoute,private project: UserProjectService) {

    this.route.queryParams.subscribe(params => {
      this.projectID = params['projectID'];

      console.log(this.projectID);
    });
  }

  ngOnInit() {
    this.getProjectById();
  }

  getProjectById(){
    this.project.getProjectById(this.projectID).subscribe(data=>{
      console.log(data);
    });
  }
}
