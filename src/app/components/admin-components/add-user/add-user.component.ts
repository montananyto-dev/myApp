import {Component, OnInit} from '@angular/core';
// import {FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
// import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
// import {Http, Response} from '@angular/http';
import {UserTypeService} from '../../../services/user-type/user-type.service';
import {UserService} from '../../../services/user/user.service';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
// import {ModuleService} from '../../../services/module/module.service';
import {CourseService} from '../../../services/course/course.service';
import {OrganisationService} from '../../../services/organisation/organisation.service';
import {LoginFormComponent} from '../../login-components/login-form/login-form.component';
import {ModuleService} from '../../../services/module/module.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({

    organisation: new FormControl(),
    userType: new FormControl(),
    course: new FormControl(),
    module: new FormControl(),
    firstName: new FormControl('', Validators.pattern('[a-zA-Z]+')), // input field that can contain only three letters (no numbers or special characters):
    lastName: new FormControl('', Validators.pattern('[a-zA-Z]+')),
    dateOfBirth: new FormControl(),
    password: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')), // An <input> element with type="password" that must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter:
    passwordConfirmation: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    department: new FormControl()
  });

  public apiUrl = 'http://slim.kingstonse.org/home/add/users';
  public apiUrl2 = 'http://slim.kingstonse.org/return/specific';

  users;
  modules;
  courses;
  userTypes;
  organisations;
  userTypeChange: String = 'unselected';

  usersDataJson: any;
  selectionDataJson: any;
  courseDataJson: any;
  moduleDataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;

  //for testing adduser only, need to remove after
   loginClass = new LoginFormComponent(this.router, this.user, this.organisation, this.module, this.course, this.userType, this.http);

  constructor(private router: Router,
              private user: UserService,
              // private module: ModuleService,
              private course: CourseService,
              private userType: UserTypeService,
              private organisation: OrganisationService,
              private module: ModuleService,
              private http: HttpClient) {}


  ngOnInit() {

    this.users = this.user.getAllUsers();
    this.userTypes = this.userType.getAllUserTypes();
    this.courses = this.course.getCourses();
    this.organisations = this.organisation.getOrganisations();
//for testing adduser only, need to remove after
    this.loginClass.getAllUsers();
    this.loginClass.getAllOrganisations();
    this.loginClass.getAllCourses();
    this.loginClass.getAllModules();
    this.loginClass.getAllUserTypes();

    this.retrieveUsers();
    this.retrieveCourses();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();

  }




retrieveOrganisations(){

  this.organisation.getOrganisations().subscribe(data => {
    this.organisationDataJson = data;
    this.organisations = data;

  })}

  retrieveUsers(){

    this.user.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;

    })}


  retrieveCourses(){

    this.course.getAllCourses().subscribe(data => {
      this.courseDataJson = data;
      this.courses = data;
    })}


  retrieveModules(){

    this.module.getAllModules().subscribe(data => {
      this.moduleDataJson = data;
      this.modules = data;

    })}

  retrieveUserTypes(){

    this.userType.getAllUserTypes().subscribe(data => {
      this.userTypeDataJson = data;
      this.userTypes = data;

    })}

  onSubmit = function (submit) {

    console.log(JSON.stringify(submit));
    return this.http.post(this.apiUrl, JSON.stringify(submit),
      {
        headers: {
          'Accept': 'application/ json',
          'Content-Type': 'application/json'
        }
      }).subscribe
    (data => {
        console.log(data);
      },
      err => {
        console.log('Error occured');
      });
  };

  checkValue(e, type) {
    console.log(e.target.checked);
    console.log(type);
  }

  sendUserType(e) {

    console.log('userType: ' + e );

    if (e === 'Student') {
      this.userTypeChange = 'Student';
    } else if (e === 'Admin') {
      this.userTypeChange = 'Admin';
    } else {
      this.userTypeChange = 'Lecturer';
    }
  }

  sendCourse(e) {
    console.log(e);
    return this.http.get(this.apiUrl2 + '/' + e).subscribe(object => {
      this.selectionDataJson = object;
      this.modules = this.selectionDataJson;
      console.log(this.selectionDataJson);
    });
  }

}

