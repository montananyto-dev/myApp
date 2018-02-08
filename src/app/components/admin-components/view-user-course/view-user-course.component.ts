import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/course/course.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-view-user-course',
  templateUrl: './view-user-course.component.html',
  styleUrls: ['./view-user-course.component.css']
})
export class ViewUserCourseComponent implements OnInit {

  courses;
  users;
  courseDataJson: any;
  usersDataJson: any;
  viewUserByCourseApi = "http://slim.kingstonse.org/view/user";

  displayUsers: boolean = false;

  constructor(private courseService: CourseService, private http: HttpClient) {
  }

  ngOnInit() {
    this.retrieveCourses();
  }


  retrieveUsersFromCourse(courseId) {

    console.log('courseID: ' + courseId);

    this.http.get(this.viewUserByCourseApi + '/' + courseId).subscribe(object => {

      if (object.toLocaleString().includes("No users for this module")) {

        console.log("oooops");
        this.users = "No users for this module";
        this.displayUsers = false;
      } else {

        this.usersDataJson = object;
        this.users = this.usersDataJson;
        this.displayUsers = true;

      }


    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");

    });

  }

  retrieveCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseDataJson = data;
      this.courses = data;
    })
  }

}
