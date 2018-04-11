import { Component, OnInit } from '@angular/core';
import {CourseService} from "../../../services/admin-services/course/course.service";
import {ModuleService} from "../../../services/admin-services/module/module.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";
import {UserService} from "../../../services/admin-services/user/user.service";
import {UserTypeService} from "../../../services/admin-services/user-type/user-type.service";

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  public addCourseApi = 'http://slim.kingstonse.org/add/course';

  courseForm: FormGroup;

  usersDataJson: any;
  courseDataJson: any;
  moduleDataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;

  users;
  allModules;
  courses;
  userTypes;
  organisations;


  constructor(private userService: UserService,
              private courseService: CourseService,
              private userTypeService: UserTypeService,
              private organisationService: OrganisationService,
              private moduleService: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.courseForm= this.formBuilder.group({

      courseName: new FormControl(),
      courseDescription: new FormControl()
    })
  }

  ngOnInit() {

    this.retrieveUsers();
    this.retrieveCourses();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();
  }

  onSubmit = function (dataForm) {

    if (this.courseForm.valid) {

      this.http.post(this.addCourseApi, JSON.stringify(dataForm),
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          }
        }).subscribe
      (data => {

        //reset the form after submission
        this.courseForm.reset();

        //print out the data return by the server
        console.log(data);

      }, err => {

        console.log(err);
        console.error("The course could not be added");

      });

    }
  };



  retrieveOrganisations() {
    this.organisationService.getOrganisations().subscribe(data => {
      this.organisationDataJson = data;
      this.organisations = data;
    })
  }

  retrieveUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;
    })
  }

  retrieveCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courseDataJson = data;
      this.courses = data;
    })
  }

  retrieveModules() {
    this.moduleService.getAllModules().subscribe(data => {
      this.moduleDataJson = data;
      this.allModules = data;
    })
  }

  retrieveUserTypes() {
    this.userTypeService.getAllUserTypes().subscribe(data => {
      this.userTypeDataJson = data;
      this.userTypes = data;
    })
  }
}
