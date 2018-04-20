import { Component, OnInit } from '@angular/core';
import {UserProjectTeamMembersService} from "../../../services/user_services/user-project-team-members/user-project-team-members.service";

@Component({
  selector: 'app-view-team-members',
  templateUrl: './view-team-members.component.html',
  styleUrls: ['./view-team-members.component.css']
})
export class ViewTeamMembersComponent implements OnInit {

  teamMembers:any;
  public projectId: string;

  constructor(private teamMembersService : UserProjectTeamMembersService ) { }

  ngOnInit() {
    this.retrieveTeamMembers();
  }



  retrieveTeamMembers(){
    this.teamMembersService.getTeamMembersByProjectId(this.projectId).subscribe(data=>{
      this.teamMembers = data;

    })
  }
}
