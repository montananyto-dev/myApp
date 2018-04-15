import { BrowserModule } from '@angular/platform-browser';
import {NgModule, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Router,RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';



import { NavbarAdminComponent } from './components/admin-components/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from './components/admin-components/sidebar-admin/sidebar-admin.component';
import { HomeAdminComponent } from './components/admin-components/home-admin/home-admin.component';

import { NavbarUserComponent } from './components/user-components/navbar-user/navbar-user.component';
import { SidebarUserComponent } from './components/user-components/sidebar-user/sidebar-user.component';
import { DashboardComponent } from './components/user-components/dashboard/dashboard.component';

import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/login-component/login-form.component';
import { AddUserComponent } from './components/admin-components/add-user/add-user.component';
import { ViewUserComponent } from './components/admin-components/view-user/view-user.component';
import { ViewOrganisationComponent } from './components/admin-components/view-organisation/view-organisation.component';
import { ViewModuleComponent } from './components/admin-components/view-module/view-module.component';
import { ViewCourseComponent } from './components/admin-components/view-course/view-course.component';
import { AuthenticationGuard } from './guards/authentification.guard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { UserService } from './services/admin-services/user/user.service';
import { OrganisationService } from './services/admin-services/organisation/organisation.service';
import { ModuleService } from './services/admin-services/module/module.service';
import {CourseService} from './services/admin-services/course/course.service';
import { UserTypeService } from './services/admin-services/user-type/user-type.service';

import { ReactiveFormsModule } from '@angular/forms';
import { AddOrganisationComponent } from './components/admin-components/add-organisation/add-organisation.component';
import { AddModuleComponent } from './components/admin-components/add-module/add-module.component';
import { AddCourseComponent } from './components/admin-components/add-course/add-course.component';
import { ViewUserCourseComponent } from './components/admin-components/view-user-course/view-user-course.component';
import { EditUserComponent } from './components/admin-components/edit-user/edit-user.component';
import { AddProjectComponent } from './components/user-components/add-project/add-project.component';
import {UserModelService} from "./services/user_services/user-model/user-model.service";
import {UserProjectService} from "./services/user_services/user-project/user-project.service";
import { ViewAllProjectComponent } from './components/user-components/view-all-project/view-all-project.component';
import { ProfileUserComponent } from './components/user-components/profile-user/profile-user.component';


import { ProfileAdminComponent } from './components/admin-components/profile-admin/profile-admin.component';
import { ViewProjectComponent } from './components/user-components/view-project/view-project.component';

const appRoutes: Routes = [

  { path: '',   redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login', component: LoginFormComponent
  },
   {
    path: 'home', /* canActivate: [AuthenticationGuard],  access to home page once logged in */
    component: HomeAdminComponent
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
  },{
    path:'add/project',
    component:AddProjectComponent
  },
  {
    path:'view/all/project',
    component:ViewAllProjectComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'user/profile',
    component:ProfileUserComponent
  },
  {
    path:'admin/profile',
    component:ProfileAdminComponent
  },{
  path:'view/project',
    component:ViewProjectComponent
  }

];


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AddUserComponent,
    ViewUserComponent,
    ViewOrganisationComponent,
    ViewModuleComponent,
    ViewCourseComponent,
    AddOrganisationComponent,
    AddModuleComponent,
    AddCourseComponent,
    ViewUserCourseComponent,
    EditUserComponent,
    DashboardComponent,

    NavbarAdminComponent,
    SidebarAdminComponent,

    NavbarUserComponent,
    SidebarUserComponent,

    AddProjectComponent,
    HomeAdminComponent,
    ViewAllProjectComponent,
    ProfileUserComponent,
    ProfileAdminComponent,
    ViewProjectComponent

  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    UserProjectService,
    UserService,
    OrganisationService,
    ModuleService,
    UserModelService,
    UserTypeService,
    CourseService,
    AuthenticationGuard,
    HttpClientModule,
    HttpClient ],
  bootstrap: [AppComponent]
})

export class AppModule implements OnInit {

  constructor(private router: Router,
              private user: UserService,
              private module: ModuleService,
              private http: HttpClient,
              private userType: UserTypeService,
              private userModel: UserModelService) {
  }

  ngOnInit() {
  }

}


