import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';


import { UserService } from '../../../services/user/user.service';
import { HttpClient} from '@angular/common/http';
import {OrganisationService} from '../../../services/organisation/organisation.service';
import {ModuleService} from '../../../services/module/module.service';
import {UserTypeService} from '../../../services/user-type/user-type.service';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  public userApi = 'http://slim.kingstonse.org/view/user';
  public userTypeApi = 'http://slim.kingstonse.org/view/usertype';
  public organisationApi = 'http://slim.kingstonse.org/view/organisation';
  public moduleApi = 'http://slim.kingstonse.org/view/module';
  public courseApi = 'http://slim.kingstonse.org/view/course';

  userdataJson: any;
  userTypeDataJson: any;
  organisationDataJson: any;
  moduleDataJson: any;
  courseDataJson: any;

  inputUserName;
  inputPassword;

  constructor(private router: Router,
              private user: UserService,
              private organisation: OrganisationService,
              private module: ModuleService,
              private course: CourseService,
              private userType: UserTypeService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.getAllUsers();
    this.getAllOrganisations();
    this.getCourses();
    this.getModules();
    this.getUserType();
  }

  loginUser(event) {

    event.preventDefault();
    this.inputUserName = event.target.elements[0].value;
    this.inputPassword = event.target.elements[1].value;

    this.userdataJson.forEach(element => {

      if (element['first_name'] === this.inputUserName && element['password'] === this.inputPassword) {
        this.user.setCurrentUser(this.inputUserName);
        this.user.setUserLoggedIn();
        this.router.navigateByUrl('/home');
      } else {
        return ErrorEvent;
      }
    });
  }
  getAllUsers() {
    return this.http.get(this.userApi).subscribe(object => {
      this.userdataJson = object;
      this.user.setAllUsers(this.userdataJson);
    });
  }
  getAllOrganisations() {
    return this.http.get(this.organisationApi).subscribe(object => {
      this.organisationDataJson = object;
      this.organisation.setOrganisations(this.organisationDataJson);
    });
  }
  getModules() {
    return this.http.get(this.moduleApi).subscribe(object => {
      this.moduleDataJson = object;
      this.module.setModules(this.moduleDataJson);
    });
  }
  getCourses() {
    return this.http.get(this.courseApi).subscribe(object => {
      this.courseDataJson = object;
      this.course.setCourses(this.courseDataJson);
    });
  }
  getUserType() {
    return this.http.get(this.userTypeApi).subscribe(object => {
      this.userTypeDataJson = object;
      this.userType.setUserType(this.userTypeDataJson);
    });
  }
}


