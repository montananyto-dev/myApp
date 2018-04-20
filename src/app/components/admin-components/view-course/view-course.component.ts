import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CourseService} from '../../../services/admin-services/course/course.service';


@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  courses;

  constructor(private router: Router, private course: CourseService) {
  }

  ngOnInit() {
    this.retrieveCourses()
  }

  retrieveCourses(){
    this.course.getAllCourses().subscribe(data => {
    this.courses = data;
  })}

}
