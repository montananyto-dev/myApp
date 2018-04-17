import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {ProjectGoalService} from "../../../services/user_services/user-project-goal/project-goal.service";
import {ProjectObjectiveService} from "../../../services/user_services/user-project-objective/project-objective.service";
import {ProjectWorkflowStepService} from "../../../services/user_services/user-project-workflow-step/project-workflow-step.service";

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.css']
})
export class ViewProjectDetailsComponent implements OnInit {

  projectID:string;

  constructor(private route:ActivatedRoute,
              private project:UserProjectService,
              private goalService:ProjectGoalService,
              private objectiveService : ProjectObjectiveService,
              private workflowStepService: ProjectWorkflowStepService) {

    this.route.params.subscribe(params => this.projectID = params['projectID']);
    console.log(this.projectID);

  }

  ngOnInit() {
    this.getProject();
    this.getProjectGoal();
    this.getProjectObjective();
    this.getProjectWorkflowStep();
  }


  getProject(){
    this.project.getProjectByProjectId(this.projectID).subscribe(project=>{
      console.log(project);
    });
  }


  getProjectGoal(){
    this.goalService.getGoalByProjectId(this.projectID).subscribe(goal=>{
      console.log(goal);
    });
  }

  getProjectObjective(){
   this.objectiveService.getObjectiveByProjectId(this.projectID).subscribe(objective=>{
     console.log(objective);
   })
  }

  getProjectWorkflowStep(){
    this.workflowStepService.getWorkflowStepByProjectId(this.projectID).subscribe(workflowStep=>{
      console.log(workflowStep);
    })

  }



}
