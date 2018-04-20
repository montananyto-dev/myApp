import { Component, OnInit } from '@angular/core';
import {ProjectGoalService} from "../../../services/user_services/user-project-goal/project-goal.service";
import {ProjectObjectiveService} from "../../../services/user_services/user-project-objective/project-objective.service";

@Component({
  selector: 'app-view-project-more-details',
  templateUrl: './view-project-more-details.component.html',
  styleUrls: ['./view-project-more-details.component.css']
})
export class ViewProjectMoreDetailsComponent implements OnInit {

  public projectId: string;
  projectGoal:any;
  projectObjective:any;

  constructor( private goalService: ProjectGoalService,
               private objectiveService: ProjectObjectiveService,) { }

  ngOnInit() {
    this.getProjectGoal();
    this.getProjectObjective();
  }


  getProjectGoal() {
    this.goalService.getGoalByProjectId(this.projectId).subscribe(goal => {
      this.projectGoal = goal;
    });
  }

  getProjectObjective() {
    this.objectiveService.getObjectiveByProjectId(this.projectId).subscribe(objective => {
      this.projectObjective = objective;
    })
  }

}
