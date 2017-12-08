import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  courses;
  courseDataJson: any;

  constructor(private router: Router, private course: CourseService, private http: HttpClient) {

  }

  ngOnInit() {

    this.retrieveCourses()
  }

  retrieveCourses(){

    this.course.getAllCourses().subscribe(data => {
    this.courseDataJson = data;
    this.courses = data;
  })}

}
