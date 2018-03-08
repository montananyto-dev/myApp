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
<<<<<<< HEAD
  usersDataJson: any;
  selectionDataJson: any;
  courseDataJson: any;
  moduleDataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;
=======

>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
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
      firstName: new FormControl('', Validators.pattern('[a-zA-Z]{2,30}$')), // input field that can contain only letters (no numbers or special characters) with a min 2 and max 30
      lastName: new FormControl('', Validators.pattern('[a-zA-Z]{2,30}$')),// input field that can contain only letters (no numbers or special characters) with a min 2 and max 30
      dateOfBirth: new FormControl('',Validators.pattern('')),
      courseModule: this.formBuilder.group({
        course: this.formBuilder.array([], Validators.required),
        module: this.formBuilder.array([], Validators.required),}),
      password: this.formBuilder.group({
        passwordInput: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')), // "Password" that must contain 8 or more characters with at least one number, and one uppercase and lowercase letter
        passwordConfirm: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')),// "Password" that must contain 8 or more characters with at least one number, and one uppercase and lowercase letter
      }, {validator: this.passwordMatchValidator}),
      email: new FormControl('', Validators.email),
      phoneNumber: new FormControl('', Validators.pattern('^[0-9()-]+$')),
      department: new FormControl('',Validators.pattern('^[a-zA-Z]{5,25}$'))
    })
  };


  passwordMatchValidator(password: FormGroup) {

    return password.get('passwordInput').value === password.get('passwordConfirm').value
      ? null : {'mismatch': true};

  }

  ngOnInit() {

    this.retrieveUsers();
    this.retrieveCourses();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();
  }

  checkUserType(userType) {

    //console.log('userTypeID: ' + userType);

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
<<<<<<< HEAD
=======

    for (let i = 0; i < courseID.length; i++) {

      //console.log("course id: " + courseID[i]);

    }
>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
    this.retrieveModuleFromCourse(courseID);
  }

  sendCourseLecturer(event) {
<<<<<<< HEAD
=======

    //console.log(event);

>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
    this.resetFormControlCourse();
    this.resetFormControlModule();

    for (let i = 0; i < this.selectedCourses.length; i++) {
<<<<<<< HEAD
      console.log("course id: " + this.selectedCourses[i]);
=======

      //console.log("course id: " + this.selectedCourses[i]);

>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
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
<<<<<<< HEAD
      this.selectionDataJson = object;
      this.modulesMatchingCourses = this.selectionDataJson;
=======
      this.modulesMatchingCourses = object;

>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
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
<<<<<<< HEAD
        console.log(data);
=======
       // console.log(data);

>>>>>>> bcec9b15620bf069791e0d6f81b32cf60e3c4aab
      }, err => {
        console.log(err);
        console.error("Could not be added");
      });

    }
  };

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
  retrieveCourses() {
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
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


