import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CourseService} from "../../../services/admin-services/course/course.service";
import {HttpClient} from "@angular/common/http";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";

@Component({
  selector: 'app-view-course-organisation',
  templateUrl: './view-course-organisation.component.html',
  styleUrls: ['./view-course-organisation.component.css']
})
export class ViewCourseOrganisationComponent implements OnInit {

  courses:any;
  organisations:any;
  displayCourses:boolean = false;

  constructor(private router: Router, private course: CourseService,
              private organisationService:OrganisationService,
              private courseService:CourseService) {
  }

  ngOnInit() {

    this.retrieveOrganisation();
  }

  retrieveCoursesFromOrganisation(organisationId) {

    console.log(organisationId);

    this.courseService.getCoursesByOrganisationId(organisationId).subscribe(object => {
      if (object.toLocaleString().includes("There are no courses for this organisation")) {
        this.courses = "There are no courses for this organisation";
        this.displayCourses = false;
      } else {
        this.courses = object;
        this.displayCourses = true;
      }
    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");
    });
  }

  retrieveOrganisation(){
    this.organisationService.getOrganisations().subscribe(data=>{
      console.log(data);
      this.organisations = data;
    })
  }

}
