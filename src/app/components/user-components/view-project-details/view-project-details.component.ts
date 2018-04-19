import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {ProjectGoalService} from "../../../services/user_services/user-project-goal/project-goal.service";
import {ProjectObjectiveService} from "../../../services/user_services/user-project-objective/project-objective.service";
import {ProjectWorkflowStepService} from "../../../services/user_services/user-project-workflow-step/project-workflow-step.service";
import {ProjectTaskService} from "../../../services/user_services/user_project-task/project-task.service";
import {HttpClient} from "@angular/common/http";
import {ProjectCommentService} from "../../../services/user_services/user-project-comment/project-comment.service";
import {UserProjectTeamMembersService} from "../../../services/user_services/user-project-team-members/user-project-team-members.service";
import {Observable} from "rxjs/Observable";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ViewTaskDetailsComponent} from "../view-task-details/view-task-details.component";
import {Overlay} from "@angular/cdk/overlay";



@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.css']
})
export class ViewProjectDetailsComponent implements OnInit {

  actualProject:any;
  projectId: string;
  taskId:string;
  projectGoal: any;
  projectObjective: any;
  projectWorkflowStep: any;
  projectTeamMembers:any;
  projectComments:any;
  projectTask: any;
  taskStatus1: any;
  taskStatus2: any;
  taskStatus3: any;
  taskStatus4: any;
  emptyArray = [];

  viewTaskDetails: MatDialogRef<ViewTaskDetailsComponent>;

  updateTaskStatusApi = "http://slim.kingstonse.org/update/task/";

  constructor(private route: ActivatedRoute,
              private project: UserProjectService,
              private goalService: ProjectGoalService,
              private objectiveService: ProjectObjectiveService,
              private commentService: ProjectCommentService,
              private teamMembersService: UserProjectTeamMembersService,
              private workflowStepService: ProjectWorkflowStepService,
              private taskService: ProjectTaskService,
              private http: HttpClient,
              public dialog: MatDialog,) {

    this.route.params.subscribe(params => this.projectId = params['projectId']);
  }

  ngOnInit() {
    this.getProject();
    this.getProjectGoal();
    this.getProjectObjective();
    this.getProjectWorkflowStep();
    this.getProjectTask();
    this.getProjectComment();
    this.getProjectTeamMember();
    this.getProjectTaskByStatus1();
    this.getProjectTaskByStatus2();
    this.getProjectTaskByStatus3();
    this.getProjectTaskByStatus4();
    // this.setObservableTaskStatus(); ---------------------------------------------->DONT FORGET
  }
  redirectToTaskDetails(event){
    this.taskId = event.target.id.toString();

    this.viewTaskDetails = this.dialog.open(ViewTaskDetailsComponent , {
      width: '400px',
      height: '400px',
    });
    this.viewTaskDetails.componentInstance.projectId = this.projectId;
    this.viewTaskDetails.componentInstance.taskId = this.taskId;

  }
  setObservableTaskStatus(){

    IntervalObservable.create(10000)
      .subscribe(() => {
        this.getProjectTaskByStatus1();
        this.getProjectTaskByStatus2();
        this.getProjectTaskByStatus3();
        this.getProjectTaskByStatus4();
      });

  }

  updateStatus(currentPosition,taskStatus, taskId, projectId, position:string) {

    var taskStatusNum = Number(taskStatus);
    console.log("The original task status: " +taskStatusNum);
    console.log(position);

    if (position === "right") {
      console.log("right");
      taskStatusNum = taskStatusNum +1;
    } else if(position === "left"){
      console.log("left");
      taskStatusNum = taskStatusNum -1;
    }

    console.log("The new task status: " +taskStatusNum);

    var data = {taskId: taskId, taskStatus: taskStatusNum, projectId: projectId};

    this.http.put(this.updateTaskStatusApi = "http://slim.kingstonse.org/update/task", data,
      {
        headers: {
          'Accept': 'application/ json',
          'Content-Type': 'application/json'
        }
      }).subscribe
    (data => {
      console.log(data);
      this.getProjectTaskByStatus1();
      this.getProjectTaskByStatus2();
      this.getProjectTaskByStatus3();
      this.getProjectTaskByStatus4();

    }, err => {
      console.error(err);
    });
  }

  getProject() {
    this.project.getProjectByProjectId(this.projectId).subscribe(project => {
        this.actualProject = project;
    });
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

  getProjectWorkflowStep() {
    this.workflowStepService.getWorkflowStepByProjectId(this.projectId).subscribe(workflowStep => {
      this.projectWorkflowStep = workflowStep;
    })
  }

  getProjectTask() {
    this.taskService.getTaskByProjectId(this.projectId).subscribe(tasks => {
      this.projectTask = tasks;
    })
  }

  getProjectTeamMember(){
    this.teamMembersService.getTeamMembersByProjectId(this.projectId).subscribe(teamMembers=>{
      this.projectTeamMembers = teamMembers;
    })

  }

  getProjectComment(){
    this.commentService.getCommentByProjectId(this.projectId).subscribe(comments=>{
      this.projectComments = comments;
    })

  }

  getProjectTaskByStatus1() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectId, "1").subscribe(tasks => {

      if(tasks === "No tasks for this project"){
        this.taskStatus1 = this.emptyArray;
      }else{
        this.taskStatus1 = tasks;
      }

    })
  }

  getProjectTaskByStatus2() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectId, "2").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus2 = this.emptyArray;
      }else{
        this.taskStatus2 = tasks;
      }
    })
  }

  getProjectTaskByStatus3() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectId, "3").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus3 = this.emptyArray;
      }else{
        this.taskStatus3 = tasks;
      }
    })
  }

  getProjectTaskByStatus4() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectId, "4").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus4 = this.emptyArray;
      }else{
        this.taskStatus4 = tasks;
      }
    })
  }
}
