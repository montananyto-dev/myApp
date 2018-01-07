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

  public addUserApi = 'http://slim.kingstonse.org/home/add/users';
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
  userTypeChange: String = 'unselected';


  constructor(private user: UserService,
              private course: CourseService,
              private userType: UserTypeService,
              private organisation: OrganisationService,
              private module: ModuleService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.retrieveUsers();
    this.retrieveCourses();
    this.retrieveModules();
    this.retrieveUserTypes();
    this.retrieveOrganisations();

    this.userForm = this.formBuilder.group({

      userType: new FormControl(),
      organisation: new FormControl(),
      firstName: new FormControl('', Validators.pattern('[a-zA-Z]+')), // input field that can contain only three letters (no numbers or special characters):
      lastName: new FormControl('', Validators.pattern('[a-zA-Z]+')),
      dateOfBirth: new FormControl(),

      courseModule: this.formBuilder.group({
        course: new FormControl(),
        module: this.formBuilder.array([]),
      }),



      password: this.formBuilder.group({
        passwordInput: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')), // An <input> element with type="password" that must contain 8 or more characters that are of at least one number, and one uppercase and lowercase letter:
        passwordConfirm: new FormControl('', Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')),
      }, passwordMatchValidator),

      email: new FormControl(),
      phoneNumber: new FormControl(),
      department: new FormControl()
    })

    function passwordMatchValidator(inputs: FormGroup) {
      return inputs.get('passwordInput').value === inputs.get('passwordConfirm').value
        ? null : {'mismatch': true};
    }
  }


  checkUserType(userType) {

    console.log('userType: ' + userType);

    if (userType === 'Student') {

      this.userTypeChange = 'Student';

    } else if (userType === 'Admin') {

      this.userTypeChange = 'Admin';

    } else {

      this.userTypeChange = 'Lecturer';

    }
  }



  sendCourse(event) {

    var courseID = this.userForm.get('courseModule').value.course;

    for (let i = 0; i < courseID.length; i++) {
      console.log("course id: " + courseID[i]);
    }
    this.retrieveModuleFromCourse(courseID);
  }


  selectModule(event, module,module_name:string) {

    const moduleControl = <FormArray>this.userForm.controls['courseModule'].get('module');

    if(event.target.checked){
      // Add a new control in the arrayForm
      moduleControl.push(new FormControl(module_name));

    }else{
      // find the unselected element
      let i: number = 0;

      moduleControl.controls.forEach((ctrl: FormControl) => {

        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          moduleControl.removeAt(i);

          return;
        }
        i++;
      });
    }

    // if (event.target.checked) {
    //
    //   this.selectedModule.push(module);
    //
    // } else {
    //
    //   this.selectedModule.splice(this.selectedModule.indexOf(module), 1);
    //
    // }
    // console.log(this.selectedModule);

  }


  retrieveModuleFromCourse(courseIds) {

    return this.http.get(this.apiUrl2 + '/' + courseIds).subscribe(object => {
      this.selectionDataJson = object;
      this.modulesMatchingCourses = this.selectionDataJson;

    });
  }


  onSubmit = function (submit) {

    console.log(JSON.stringify(submit));
    return this.http.post(this.addUserApi, JSON.stringify(submit),
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


  retrieveOrganisations() {
    this.organisation.getOrganisations().subscribe(data => {
      this.organisationDataJson = data;
      this.organisations = data;
    })
  }

  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.usersDataJson = data;
      this.users = data;
    })
  }

  retrieveCourses() {
    this.course.getAllCourses().subscribe(data => {
      this.courseDataJson = data;
      this.courses = data;
    })
  }

  retrieveModules() {
    this.module.getAllModules().subscribe(data => {
      this.moduleDataJson = data;
      this.allModules = data;
    })
  }

  retrieveUserTypes() {
    this.userType.getAllUserTypes().subscribe(data => {
      this.userTypeDataJson = data;
      this.userTypes = data;
    })
  }
}


