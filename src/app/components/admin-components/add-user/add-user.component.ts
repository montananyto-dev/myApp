import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Http, Response} from '@angular/http';
import {UserTypeService} from '../../../services/user-type/user-type.service';
import {UserService} from '../../../services/user/user.service';
import 'rxjs/add/operator/map';
import {HttpClient} from '@angular/common/http';
import {ModuleService} from '../../../services/module/module.service';
import {CourseService} from '../../../services/course/course.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({

    userType: new FormControl(),
    course: new FormControl(),
    module: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    dateOfBirth: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    phoneNumber: new FormControl(),
    department: new FormControl()
  });

  public apiUrl = 'http://slim.kingstonse.org/home/add/users';

  users;
  modules;
  courses;
  userTypes;

  constructor(private router: Router, private user: UserService, private module: ModuleService, private course: CourseService, private userType: UserTypeService,
              private http: HttpClient) {
  }

  ngOnInit() {

    this.users = this.user.getAllUsers();
    this.modules = this.module.getModules();
    this.userTypes = this.userType.getUserType();
    this.courses = this.course.getCourses();
  }

  addUser = function (newUser) {
    console.log(JSON.stringify(newUser));
    return this.http.post(this.apiUrl, JSON.stringify(newUser),
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
}
