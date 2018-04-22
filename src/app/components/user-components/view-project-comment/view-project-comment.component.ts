import { Component, OnInit } from '@angular/core';
import {ProjectCommentService} from "../../../services/user_services/user-project-comment/project-comment.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";
import {IntervalObservable} from "rxjs/observable/IntervalObservable";

@Component({
  selector: 'app-view-project-comment',
  templateUrl: './view-project-comment.component.html',
  styleUrls: ['./view-project-comment.component.css']
})
export class ViewProjectCommentComponent implements OnInit {

  public projectId: string;
  projectComments:any;
  commentForm;
  user_first_name = this._currentUser.getUser_first_name();
  user_last_name = this._currentUser.getUser_last_name();
  userFullName = this.user_first_name +" "+ this.user_last_name;
  addTaskCommentApi = 'http://slim.kingstonse.org/add/project/comment';

  constructor(private commentService:ProjectCommentService,private formBuilder:FormBuilder,
  private http:HttpClient,private _currentUser:UserModelService) {

    this.commentForm = this.formBuilder.group({
      description: new FormControl('',Validators.required),
      projectIdForm : new FormControl(),
      creator : new FormControl()
    });
  }

  ngOnInit(
  ) {
    this.getProjectComment();
    this.setObservableProjectComments();
  }

  setObservableProjectComments(){

    IntervalObservable.create(10000)
      .subscribe(() => {
        this.getProjectComment();
        console.log("Called project comment");
      });
  }

  onSubmit(dataForm){

    this.http.post(this.addTaskCommentApi, JSON.stringify(dataForm),
      {
        headers: {
          'Accept': 'application/ json',
          'Content-Type': 'application/json'
        }
      }).subscribe
    (data => {

      this.commentForm.reset();
      console.log(data);

    }, err => {
      console.log(err);
    });

  }

  getProjectComment(){
    this.projectId =  window.localStorage.getItem('currentProjectId');
    this.commentService.getCommentByProjectId(this.projectId).subscribe(comments=>{
      this.projectComments = comments;
    })

  }



}
