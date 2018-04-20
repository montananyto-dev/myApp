import {Component, OnInit} from '@angular/core';
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
  users: any;
  courses: any;
  organisations: any;
  courseInserted: boolean = false;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private userTypeService: UserTypeService,
              private organisationService: OrganisationService,
              private moduleService: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.courseForm = this.formBuilder.group({

      organisationId: new FormControl(),
      courseName: new FormControl(),
      courseDescription: new FormControl(),
      courseYear: new FormControl()
    })
  }

  ngOnInit() {
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

        this.courseForm.reset();
        this.showDivInserted();
        console.log(data);

      }, err => {
        console.log(err);
      });
    }
  };

  showDivInserted(): void {
    this.courseInserted = true;
    setTimeout(function () {
      this.courseInserted = false;
    }.bind(this), 3000);
  }

  retrieveOrganisations() {
    this.organisationService.getOrganisations().subscribe(data => {
      this.organisations = data;
    })
  }
}
