import {Component, OnInit} from '@angular/core';
import {ProjectTaskService} from "../../../services/user_services/user_project-task/project-task.service";
import {ActivatedRoute} from "@angular/router";
import {ViewTaskCommentsService} from "../../../services/user_services/user-view-task-comment/view-task-comments.service";
import {FormBuilder, FormControl, Validator, Validators} from "@angular/forms";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {HttpClient} from "@angular/common/http";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

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
  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();
  userFullName = this.user_first_name + " " + this.user_last_name;
  addTaskCommentApi = 'http://slim.kingstonse.org/add/task/comment';
  emptyArray = [];

  constructor(private taskService: ProjectTaskService,
              private route: ActivatedRoute,
              private commentService: ViewTaskCommentsService,
              private formBuilder: FormBuilder,
              private _currentUser: UserModelService,
              private http: HttpClient) {

    this.commentForm = this.formBuilder.group({
      description: new FormControl('', Validators.required),
      taskIdForm: new FormControl(),
      creator: new FormControl()
    });
  }

  ngOnInit() {
    this.retrieveTaskDetails();
    this.retrieveCommentByTaskId();
    this.setObservableCommentTask();
  }

  setObservableCommentTask() {

    IntervalObservable.create(10000)
      .subscribe(() => {
        this.retrieveCommentByTaskId();

      });
  }

  onSubmit(dataForm) {

    this.http.post(this.addTaskCommentApi, JSON.stringify(dataForm),
      {
        headers: {
          'Accept': 'application/ json',
          'Content-Type': 'application/json'
        }
      }).subscribe
    (data => {

      this.retrieveCommentByTaskId();
      this.commentForm.reset();
      console.log(data);

    }, err => {
      console.log(err);
    });

  }

  retrieveCommentByTaskId() {

    this.taskId =  window.localStorage.getItem('currentTaskId');
    this.commentService.getCommentByTaskId(this.taskId).subscribe(data => {
      if (data === "No comments for this task") {
        this.comment = this.emptyArray;
      } else {
        this.comment = data;
      }
    });
  }


  retrieveTaskDetails() {
    this.taskService.getTaskByProjectIdAndTaskId(this.projectId, this.taskId).subscribe(data => {
      this.task = data;

    });
  }

}
