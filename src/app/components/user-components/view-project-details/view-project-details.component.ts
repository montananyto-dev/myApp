import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserProjectService} from "../../../services/user_services/user-project/user-project.service";
import {ProjectGoalService} from "../../../services/user_services/user-project-goal/project-goal.service";
import {ProjectObjectiveService} from "../../../services/user_services/user-project-objective/project-objective.service";
import {ProjectWorkflowStepService} from "../../../services/user_services/user-project-workflow-step/project-workflow-step.service";
import {ProjectTaskService} from "../../../services/user_services/user_project-task/project-task.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-view-project-details',
  templateUrl: './view-project-details.component.html',
  styleUrls: ['./view-project-details.component.css']
})
export class ViewProjectDetailsComponent implements OnInit {

  actualProject:any;
  projectID: string;
  projectGoal: any;
  projectObjective: any;
  projectWorkflowStep: any;
  projectTask: any;
  taskStatus1: any;
  taskStatus2: any;
  taskStatus3: any;
  taskStatus4: any;
  emptyArray = [];

  updateTaskStatusApi = "http://slim.kingstonse.org/update/task/";

  constructor(private route: ActivatedRoute,
              private project: UserProjectService,
              private goalService: ProjectGoalService,
              private objectiveService: ProjectObjectiveService,
              private workflowStepService: ProjectWorkflowStepService,
              private taskService: ProjectTaskService,
              private http: HttpClient) {

    this.route.params.subscribe(params => this.projectID = params['projectID']);
    console.log(this.projectID);
  }

  ngOnInit() {
    this.getProject();
    this.getProjectGoal();
    this.getProjectObjective();
    this.getProjectWorkflowStep();
    this.getProjectTask();
    this.getProjectTaskByStatus1();
    this.getProjectTaskByStatus2();
    this.getProjectTaskByStatus3();
    this.getProjectTaskByStatus4();

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
    this.project.getProjectByProjectId(this.projectID).subscribe(project => {
        this.actualProject = project;
    });
  }

  getProjectGoal() {
    this.goalService.getGoalByProjectId(this.projectID).subscribe(goal => {
      this.projectGoal = goal;
    });
  }

  getProjectObjective() {
    this.objectiveService.getObjectiveByProjectId(this.projectID).subscribe(objective => {
      this.projectObjective = objective;
    })
  }

  getProjectWorkflowStep() {
    this.workflowStepService.getWorkflowStepByProjectId(this.projectID).subscribe(workflowStep => {
      this.projectWorkflowStep = workflowStep;
    })
  }

  getProjectTask() {
    this.taskService.getTaskByProjectID(this.projectID).subscribe(tasks => {
      this.projectTask = tasks;
    })
  }

  getProjectTaskByStatus1() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectID, "1").subscribe(tasks => {

      if(tasks === "No tasks for this project"){
        this.taskStatus1 = this.emptyArray;
      }else{
        this.taskStatus1 = tasks;
      }

    })
  }

  getProjectTaskByStatus2() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectID, "2").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus2 = this.emptyArray;
      }else{
        this.taskStatus2 = tasks;
      }
    })
  }

  getProjectTaskByStatus3() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectID, "3").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus3 = this.emptyArray;
      }else{
        this.taskStatus3 = tasks;
      }
    })
  }

  getProjectTaskByStatus4() {
    this.taskService.getTaskByProjectIdAndStatusId(this.projectID, "4").subscribe(tasks => {
      if(tasks === "No tasks for this project"){
        this.taskStatus4 = this.emptyArray;
      }else{
        this.taskStatus4 = tasks;
      }
    })
  }
}
