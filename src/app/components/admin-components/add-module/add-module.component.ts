import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../services/admin-services/course/course.service";
import {HttpClient} from "@angular/common/http";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";
import {ModuleService} from "../../../services/admin-services/module/module.service";

@Component({
  selector: 'app-add-module',
  templateUrl: './add-module.component.html',
  styleUrls: ['./add-module.component.css']
})
export class AddModuleComponent implements OnInit {

  private addModuleApi = 'http://slim.kingstonse.org/add/module';

  moduleForm: FormGroup;
  modulesMatchingCourses:any;
  numberOfModules = 4;
  courses:any;
  organisations:any;
  moduleInserted:Boolean = false;
  emptyArray = [];
  defaultValue ="test";

  constructor(private courseService: CourseService,
              private organisationService: OrganisationService,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private moduleService: ModuleService) {

    this.moduleForm = this.formBuilder.group({
      organisation:new FormControl(),
      course: new FormControl(),
      module: this.formBuilder.array([], Validators.required)
    })
  };

  ngOnInit() {
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
  }

  deleteModule(index: number) {
    const control = <FormArray>this.moduleForm.controls['module'];
    control.removeAt(index);
    this.numberOfModules = this.numberOfModules - 1;
  }

  onSubmit = function (dataForm) {

    if (this.moduleForm.valid) {
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

    this.numberOfModules = 4;
    this.moduleForm.controls['course'].reset();
    this.resetFormArrayModules();
    this.retrieveCoursesByOrganisationId(organisationId);
  }

  retrieveModuleFromCourse(courseId) {

    this.numberOfModules = 4;
    this.resetFormArrayModules();
    this.moduleService.getModuleByCourseIds(courseId).subscribe(object => {
      this.modulesMatchingCourses = object;
      this.numberOfModules = this.modulesMatchingCourses.length;

      if (this.numberOfModules == 36) {
        this.numberOfModules = 0;
      }   else if (this.numberOfModules > 4) {
        this.resetFormArrayModules();
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
        this.courses = data;
      }
    })
  }

  retrieveOrganisations() {
    this.organisationService.getOrganisations().subscribe(data => {
      this.organisations = data;
    })
  }

}
