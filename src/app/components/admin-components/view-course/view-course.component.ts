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


  apiUrl = 'http://slim.kingstonse.org/view/course';
  courseDataJson: any;
  courses;
  constructor(private router: Router, private cou: CourseService, private http: HttpClient) {
  }

  ngOnInit() {this.getUsersDetails();}
  getUsersDetails() {
    return this.http.get(this.apiUrl).subscribe(object => {
      this.courseDataJson = object;
      this.cou.setCourses(this.courseDataJson);
      this.courses = this.cou.getCourses();
      console.log(this.courses);
    });
  }
}
