import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {ProjectWorkflowStepService} from "../../../services/user_services/user-project-workflow-step/project-workflow-step.service";
import {ProjectTaskService} from "../../../services/user_services/user_project-task/project-task.service";
import {HttpClient} from "@angular/common/http";
import {ProjectCommentService} from "../../../services/user_services/user-project-comment/project-comment.service";
import {UserProjectTeamMembersService} from "../../../services/user_services/user-project-team-members/user-project-team-members.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";
import {MatDialog, MatDialogRef} from "@angular/material";
import {ViewTaskDetailsComponent} from "../view-task-details/view-task-details.component";
import {ViewTeamMembersComponent} from "../view-team-members/view-team-members.component";
import {ViewProjectMoreDetailsComponent} from "../view-project-more-details/view-project-more-details.component";
import {ViewProjectCommentComponent} from "../view-project-comment/view-project-comment.component";

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.css']
})
export class ViewProjectDetailsComponent implements OnInit {

  actualProject:any;
  projectId: string;
  taskId:string;
  projectWorkflowStep: any;
  projectTask: any;
  taskStatus1: any;
  taskStatus2: any;
  taskStatus3: any;
  taskStatus4: any;
  emptyArray = [];

  viewTaskDetails: MatDialogRef<ViewTaskDetailsComponent>;
  viewTeamMembers: MatDialogRef<ViewTeamMembersComponent>;
  viewProjectDetails:MatDialogRef<ViewProjectMoreDetailsComponent>;
  viewProjectComments:MatDialogRef<ViewProjectCommentComponent>;

  updateTaskStatusApi = "http://slim.kingstonse.org/update/task/";

  constructor(private route: ActivatedRoute,
              private project: UserProjectService,
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
    this.getProjectWorkflowStep();
    this.getProjectTask();
    this.getProjectTaskByStatus1();
    this.getProjectTaskByStatus2();
    this.getProjectTaskByStatus3();
    this.getProjectTaskByStatus4();
    this.setObservableTaskStatus();
  }
  showViewTaskDetails(event){

    this.taskId = event.target.id.toString();

    this.viewTaskDetails = this.dialog.open(ViewTaskDetailsComponent , {
      width: '450px',
      height: '450px',
    });
    this.viewTaskDetails.componentInstance.projectId = this.projectId;
    this.viewTaskDetails.componentInstance.taskId = this.taskId;

  }

  showViewTeamMembers(){

    this.viewTeamMembers = this.dialog.open(ViewTeamMembersComponent , {
      width: '450px',
      height: '450px',
    });
    this.viewTeamMembers.componentInstance.projectId = this.projectId;

  }

  showViewProjectDetails(){
    this.viewProjectDetails = this.dialog.open(ViewProjectMoreDetailsComponent , {
      width: '450px',
      height: '450px',
    });
    this.viewProjectDetails.componentInstance.projectId = this.projectId;
  }

  showViewProjectComments(){
    this.viewProjectComments = this.dialog.open(ViewProjectCommentComponent , {
      width: '450px',
      height: '450px',
    });
    this.viewProjectComments.componentInstance.projectId = this.projectId;
  }

  setObservableTaskStatus(){

    IntervalObservable.create(10000)
      .subscribe(() => {
        console.log("update task status");
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
      console.log(project);
        this.actualProject = project;
        console.log(this.actualProject);
    });
  }

  getProjectWorkflowStep() {
    this.workflowStepService.getWorkflowStepByProjectId(this.projectId).subscribe(workflowStep => {
      this.projectWorkflowStep = workflowStep;
    })
  }

  getProjectTask() {
    this.taskService.getTaskByProjectId(this.projectId).subscribe(tasks => {
      console.log(tasks);
      this.projectTask = tasks;
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
