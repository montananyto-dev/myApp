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
  usersDataJson: any;
  courseDataJson: any;
  moduleDataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;
  selectionDataJson: any;
  modulesMatchingCourses;
  numberOfModules = 4;
  users;
  allModules;
  courses;
  userTypes;
  organisations;
  moduleInserted:Boolean = false;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private userTypeService: UserTypeService,
              private organisationService: OrganisationService,
              private moduleService: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.moduleForm = this.formBuilder.group({
      course: new FormControl(),
      module: this.formBuilder.array([], Validators.required)
    })
  };


  ngOnInit() {

    this.retrieveUsers();
    this.retrieveCourses();
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

  retrieveModuleFromCourse(courseIds) {
    this.resetFormArrayModules();
    this.http.get(this.apiUrl2 + '/' + courseIds).subscribe(object => {
      this.selectionDataJson = object;
      this.modulesMatchingCourses = this.selectionDataJson;
      this.numberOfModules = this.modulesMatchingCourses.length;

      console.log(this.numberOfModules);
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
