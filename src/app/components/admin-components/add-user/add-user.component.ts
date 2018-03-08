import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import {UserTypeService} from '../../../services/user-type/user-type.service';
import {UserService} from '../../../services/user/user.service';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {CourseService} from '../../../services/course/course.service';
import {OrganisationService} from '../../../services/organisation/organisation.service';
import {ModuleService} from '../../../services/module/module.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  public addUserApi = 'http://slim.kingstonse.org/add/user';
  public apiUrl2 = 'http://slim.kingstonse.org/return/specific';
  usersDataJson: any;
  selectionDataJson: any;
  courseDataJson: any;
  moduleDataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;
  users;
  allModules;
  modulesMatchingCourses;
  courses;
  userTypes;
  organisations;
  userTypeChange: number = 0;
  selectedCourses: any[];

  constructor(private userService: UserService,
              private courseService: CourseService,
              private userTypeService: UserTypeService,
              private organisationService: OrganisationService,
              private moduleService: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {

    this.userForm = this.formBuilder.group({

      userType: new FormControl(),
      organisation: new FormControl(),
      firstName: new FormControl('', Validators.pattern('[a-zA-Z]+')), // input field that can contain only letters (no numbers or special characters)
      lastName: new FormControl('', Validators.pattern('[a-zA-Z]+')),// input field that can contain only letters (no numbers or special characters)
      dateOfBirth: new FormControl(),
      courseModule: this.formBuilder.group({
        course: this.formBuilder.array([], Validators.required),
        module: this.formBuilder.array([], Validators.required),}),
      password: this.formBuilder.group({
        passwordInput: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')), // "Password" that must contain 8 or more characters with at least one number, and one uppercase and lowercase letter
        passwordConfirm: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')),// "Password" that must contain 8 or more characters with at least one number, and one uppercase and lowercase letter
      }, {validator: this.passwordMatchValidator}),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl('', Validators.pattern('^[0-9()-]+$')),
      department: new FormControl()
    })
  };

  ngOnInit() {

    this.retrieveUsers();
    this.retrieveCourses();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();
  }

  passwordMatchValidator(password: FormGroup) {

    return password.get('passwordInput').value === password.get('passwordConfirm').value
      ? null : {'mismatch': true};

  }

  checkUserType(userType) {

    console.log('userTypeID: ' + userType);

    if (userType == 1) {

      this.userTypeChange = 1;
      this.resetFormControlCourse();
      this.resetFormControlModule();
      this.modulesMatchingCourses = null;
      this.userForm.controls['courseModule'].enable();

    } else if (userType == 2) {

      this.userTypeChange = 2;
      this.resetFormControlCourse();
      this.resetFormControlModule();
      this.modulesMatchingCourses = null;
      this.userForm.controls['courseModule'].enable();

    } else {

      this.userTypeChange = 3;
      this.resetFormControlCourse();
      this.resetFormControlModule();
      this.modulesMatchingCourses = null;
      this.userForm.controls['courseModule'].disable();

    }
  }

  resetFormControlCourse() {
    const courseControl = <FormArray>this.userForm.controls['courseModule'].get('course');
    for (let i = courseControl.length - 1; i >= 0; i--) {
      courseControl.removeAt(i)
    }
  }

  resetFormControlModule() {
    const moduleControl = <FormArray>this.userForm.controls['courseModule'].get('module');
    for (let i = moduleControl.length - 1; i >= 0; i--) {
      moduleControl.removeAt(i)
    }
  }

  sendCourseStudent(event) {

    this.resetFormControlCourse();
    this.resetFormControlModule();
    const courseControl = <FormArray>this.userForm.controls['courseModule'].get('course');
    courseControl.push(new FormControl(event.target.value, Validators.required));
    var courseID = this.userForm.get('courseModule').value.course;
    this.retrieveModuleFromCourse(courseID);
  }

  sendCourseLecturer(event) {
    this.resetFormControlCourse();
    this.resetFormControlModule();

    for (let i = 0; i < this.selectedCourses.length; i++) {
      console.log("course id: " + this.selectedCourses[i]);
      const courseControl = <FormArray>this.userForm.controls['courseModule'].get('course');
      courseControl.push(new FormControl(this.selectedCourses[i], Validators.required));
    }
    this.retrieveModuleFromCourse(this.selectedCourses);
  }

  selectModule(event, module_id: number) {
    const moduleControl = <FormArray>this.userForm.controls['courseModule'].get('module');
    if (event.target.checked) {
      // Add a new control in the arrayForm
      moduleControl.push(new FormControl(module_id));
    } else {
      // find the unselected element
      let i: number = 0;
      moduleControl.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          moduleControl.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
  retrieveModuleFromCourse(courseIds) {
    return this.http.get(this.apiUrl2 + '/' + courseIds).subscribe(object => {
      this.selectionDataJson = object;
      this.modulesMatchingCourses = this.selectionDataJson;
    });
  }

  onSubmit = function (dataForm) {
    if (this.userForm.valid) {
      this.http.post(this.addUserApi, JSON.stringify(dataForm),
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          }
        }).subscribe
      (data => {
        //reset the form after submission
        this.userForm.reset();
        this.retrieveUsers();
        this.userForm.controls['courseModule'].disable();
        this.resetFormControlCourse();
        this.resetFormControlModule();
        this.modulesMatchingCourses = null;
        //print out the data return by the server
        console.log(data);
      }, err => {
        console.log(err);
        console.error("Could not be added");
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


