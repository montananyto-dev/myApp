import {Component, OnInit} from '@angular/core';
import {ProjectTaskService} from "../../../services/user_services/user_project-task/project-task.service";
import {ActivatedRoute} from "@angular/router";
import {ViewTaskCommentsService} from "../../../services/user_services/user-view-task-comment/view-task-comments.service";
import {FormBuilder, FormControl, Validator} from "@angular/forms";

@Component({
  selector: 'app-view-task-details',
  templateUrl: './view-task-details.component.html',
  styleUrls: ['./view-task-details.component.css']
})
export class ViewTaskDetailsComponent implements OnInit {

  public projectId: string;
  public taskId: string;
  task: any;
  comment: any;
  commentForm;

  constructor(private taskService: ProjectTaskService,
              private route: ActivatedRoute,
              private commentService: ViewTaskCommentsService,
             private formBuilder:FormBuilder) {

    this.commentForm = this.formBuilder.group({
      comment: new FormControl(),
    });
  }

  ngOnInit() {
    this.retrieveTaskDetails();
    this.retrieveCommentByTaskId();
  }

  onSubmit(data){

    console.log(data);

  }

  retrieveCommentByTaskId() {
    this.commentService.getCommentByTaskId(this.taskId).subscribe(data => {
      this.comment = data;
    })
  }

  retrieveTaskDetails() {

    this.taskService.getTaskByProjectIdAndTaskId(this.projectId, this.taskId).subscribe(data => {
      this.task = data;
      console.log(data);
    });
  }

}
