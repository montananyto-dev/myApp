import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/admin-services/course/course.service";
import {HttpClient} from "@angular/common/http";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";

@Component({
  selector: 'app-view-user-course',
  templateUrl: './view-user-course.component.html',
  styleUrls: ['./view-user-course.component.css']
})
export class ViewUserCourseComponent implements OnInit {

  courses;
  users;
  organisationId;
  organisationName;
  viewUserByCourseApi = "http://slim.kingstonse.org/view/user/course/";
  displayUsers: boolean = false;

  constructor(private courseService: CourseService, private http: HttpClient, public organisationService: OrganisationService) {
  }

  ngOnInit() {
    this.retrieveCourses();

  }

  retrieveUsersFromCourse(courseId, projectId) {

    this.http.get(this.viewUserByCourseApi + courseId).subscribe(object => {
      if (object.toLocaleString().includes("There are no users for this course")) {
        this.users = "There are no users for this course";
        this.displayUsers = false;
      } else {

        this.organisationId = object[0].organisation_id;
        this.retrieveOrganisationNameById();
        this.users = object;
        this.displayUsers = true;
      }
    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");
    });
  }

  retrieveOrganisationNameById(){
    this.organisationService.getOrganisationNameById(this.organisationId).subscribe(data=>{
      this.organisationName = data[0].organisation_name;
    })
  }

  retrieveCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    })
  }
}
