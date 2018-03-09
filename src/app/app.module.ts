import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router, RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/login-components/footer/footer.component';
import { HeaderComponent } from './components/login-components/header/header.component';
import { LoginFormComponent } from './components/login-components/login-form/login-form.component';
import { HomeComponent } from './components/admin-components/home/home.component';
import { NavbarComponent } from './components/admin-components/navbar/navbar.component';
import { AddUserComponent } from './components/admin-components/add-user/add-user.component';
import { ViewUserComponent } from './components/admin-components/view-user/view-user.component';
import { SideBarComponent } from './components/admin-components/side-bar/side-bar.component';
import { ViewOrganisationComponent } from './components/admin-components/view-organisation/view-organisation.component';
import { ViewModuleComponent } from './components/admin-components/view-module/view-module.component';
import { ViewCourseComponent } from './components/admin-components/view-course/view-course.component';
import { AuthenticationGuard } from './guards/authentification.guard';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { UserService } from './services/user/user.service';
import { OrganisationService } from './services/organisation/organisation.service';
import { ModuleService } from './services/module/module.service';
import {CourseService} from './services/course/course.service';
import { UserTypeService } from './services/user-type/user-type.service';

import { ReactiveFormsModule } from '@angular/forms';
import { AddOrganisationComponent } from './components/admin-components/add-organisation/add-organisation.component';
import { AddModuleComponent } from './components/admin-components/add-module/add-module.component';
import { AddCourseComponent } from './components/admin-components/add-course/add-course.component';
import { ViewUserCourseComponent } from './components/admin-components/view-user-course/view-user-course.component';
import { EditUserComponent } from './components/admin-components/edit-user/edit-user.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginFormComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  }, {
    path: 'home',
   canActivate: [AuthenticationGuard],  /* access to home page once logged in */
    component: HomeComponent
  }, {
    path: 'add/user',
    component: AddUserComponent
  },
  {
    path: 'view/user',
    component: ViewUserComponent
  },
  {
  path: 'view/organisation',
    component: ViewOrganisationComponent
  },
  {
    path: 'view/module',
    component: ViewModuleComponent
  },
  {
    path: 'view/course',
    component: ViewCourseComponent
  },
  {
    path: 'add/organisation',
    component: AddOrganisationComponent
  },
  {
    path: 'add/module',
    component: AddModuleComponent
  },
  {
    path:'add/course',
    component: AddCourseComponent
  },
  {
    path:'view/usercourse',
    component: ViewUserCourseComponent
  },
  {
    path:'edit/user',
    component: EditUserComponent
  }

];


@NgModule({
  declarations: [
    AppComponent, FooterComponent, HeaderComponent, LoginFormComponent, HomeComponent, NavbarComponent,
    AddUserComponent, ViewUserComponent, SideBarComponent, ViewOrganisationComponent, ViewModuleComponent, ViewCourseComponent,
    AddOrganisationComponent, AddModuleComponent, AddCourseComponent, ViewUserCourseComponent, EditUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MalihuScrollbarModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [UserService, OrganisationService, ModuleService, UserTypeService, CourseService, AuthenticationGuard],
  bootstrap: [AppComponent]
})

export class AppModule implements OnInit {

  constructor(private router: Router,
              private user: UserService,
              private module: ModuleService,
              private http: HttpClient,
              private userType: UserTypeService) {
  }

  ngOnInit() {
  }

}


