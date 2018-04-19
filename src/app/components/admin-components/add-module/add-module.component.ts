import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/admin-services/course/course.service";
import {ModuleService} from "../../../services/admin-services/module/module.service";
import {HttpClient} from "@angular/common/http";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";
import {UserService} from "../../../services/admin-services/user/user.service";
import {UserTypeService} from "../../../services/admin-services/user-type/user-type.service";

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  private addModuleApi = 'http://slim.kingstonse.org/add/module';
  private apiUrl2 = 'http://slim.kingstonse.org/return/specific';

  moduleForm: FormGroup;
  modulesMatchingCourses;
  numberOfModules = 4;
  users;
  allModules;
  courses;
  userTypes;
  organisations;
  moduleInserted:Boolean = false;
  emptyArray = [];
  courseSelected:Boolean = false;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private userTypeService: UserTypeService,
              private organisationService: OrganisationService,
              private moduleService: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.moduleForm = this.formBuilder.group({
      organisation:new FormControl(),
      course: new FormControl(),
      module: this.formBuilder.array([], Validators.required)
    })
  };

  ngOnInit() {

    this.retrieveUsers();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();
  }

  initModuleRow() {
    return this.formBuilder.group({
      moduleName: ['', Validators.required],
      moduleDescription: ['', Validators.required],
      moduleYear: ['', Validators.required]
    });
  }

  addModule() {
    const control = <FormArray>this.moduleForm.controls['module'];
    control.push(this.initModuleRow());
    this.numberOfModules = this.numberOfModules + 1;
    console.log(this.numberOfModules);
  }

  deleteModule(index: number) {
    const control = <FormArray>this.moduleForm.controls['module'];
    control.removeAt(index);
    this.numberOfModules = this.numberOfModules - 1;
  }

  onSubmit = function (dataForm) {

    if (this.moduleForm.valid) {
      console.log(JSON.stringify(dataForm));
      this.http.post(this.addModuleApi, JSON.stringify(dataForm),
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          }
        }).subscribe
      (data => {
        console.log(data);
        this.moduleForm.reset();
        this.showDivInserted();
      }, err => {
        console.log(err);

      });
    }
  };

  retrieveCoursesFromOrganisation(organisationId){
    this.moduleForm.controls['course'].reset();
    this.resetFormArrayModules();
    this.retrieveCoursesByOrganisationId(organisationId);
  }

  retrieveModuleFromCourse(courseIds) {

    this.resetFormArrayModules();
    this.http.get(this.apiUrl2 + '/' + courseIds).subscribe(object => {
      this.modulesMatchingCourses = object;
      this.numberOfModules = this.modulesMatchingCourses.length;
      if (this.numberOfModules > 4) {
        this.resetFormArrayModules();
      }
      if (this.numberOfModules == 36) {
        this.numberOfModules = 0;
      }
    });
  }

  showDivInserted(): void {
    this.moduleInserted = true;
    setTimeout(function() {
      this.moduleInserted = false;
    }.bind(this),3000);
  }

  resetFormArrayModules(){
    const control = <FormArray>this.moduleForm.controls['module'];
    while(control.length !== 0){
      control.removeAt(0);
    }
  }

  retrieveCoursesByOrganisationId(organisationId){
    this.courseService.getCoursesByOrganisationId(organisationId).subscribe(data=>{

      if (data.toLocaleString().includes("There are no courses for this organisation")) {
        this.courses = this.emptyArray;
      } else {

        this.courseSelected = true;
        console.log(data);
        this.courses = data;

      }

    })

  }

  retrieveOrganisations() {
    this.organisationService.getOrganisations().subscribe(data => {
      this.organisations = data;
    })
  }

  retrieveUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }

  retrieveModules() {
    this.moduleService.getAllModules().subscribe(data => {
      this.allModules = data;
    })
  }

  retrieveUserTypes() {
    this.userTypeService.getAllUserTypes().subscribe(data => {
      this.userTypes = data;
    })
  }
}
