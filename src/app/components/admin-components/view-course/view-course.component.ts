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

  constructor(private router: Router, private course: CourseService, private http: HttpClient) {

    this.courses = this.course.getCourses();
  }

  ngOnInit() {}


}
