import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NavbarAdminComponent} from './components/admin-components/navbar-admin/navbar-admin.component';
import {SidebarAdminComponent} from './components/admin-components/sidebar-admin/sidebar-admin.component';
import {HomeAdminComponent} from './components/admin-components/home-admin/home-admin.component';
import {NavbarUserComponent} from './components/user-components/navbar-user/navbar-user.component';
import {SidebarUserComponent} from './components/user-components/sidebar-user/sidebar-user.component';
import {DashboardComponent} from './components/user-components/dashboard/dashboard.component';
import {AppComponent} from './app.component';
import {LoginFormComponent} from './components/login-component/login-form.component';
import {AddUserComponent} from './components/admin-components/add-user/add-user.component';
import {ViewUserComponent} from './components/admin-components/view-user/view-user.component';
import {ViewOrganisationComponent} from './components/admin-components/view-organisation/view-organisation.component';
import {ViewModuleComponent} from './components/admin-components/view-module/view-module.component';
import {ViewCourseComponent} from './components/admin-components/view-course/view-course.component';
import {AuthenticationGuard} from './guards/authentification.guard';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {UserService} from './services/admin-services/user/user.service';
import {OrganisationService} from './services/admin-services/organisation/organisation.service';
import {ModuleService} from './services/admin-services/module/module.service';
import {CourseService} from './services/admin-services/course/course.service';
import {UserTypeService} from './services/admin-services/user-type/user-type.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AddOrganisationComponent} from './components/admin-components/add-organisation/add-organisation.component';
import {AddModuleComponent} from './components/admin-components/add-module/add-module.component';
import {AddCourseComponent} from './components/admin-components/add-course/add-course.component';
import {ViewUserCourseComponent} from './components/admin-components/view-user-course/view-user-course.component';
import {EditUserComponent} from './components/admin-components/edit-user/edit-user.component';
import {AddProjectComponent} from './components/user-components/add-project/add-project.component';
import {UserModelService} from "./services/user_services/user-model/user-model.service";
import {UserProjectService} from "./services/user_services/user-project/user-project.service";
import {ViewAllProjectComponent} from './components/user-components/view-all-project/view-all-project.component';
import {ProfileUserComponent} from './components/user-components/profile-user/profile-user.component';
import {ProfileAdminComponent} from './components/admin-components/profile-admin/profile-admin.component';
import {ViewUserModuleComponent} from './components/admin-components/view-user-module/view-user-module.component';
import {ViewProjectDetailsComponent} from './components/user-components/view-project-details/view-project-details.component';
import {ProjectGoalService} from "./services/user_services/user-project-goal/project-goal.service";
import {ProjectCommentService} from "./services/user_services/user-project-comment/project-comment.service";
import {ProjectObjectiveService} from "./services/user_services/user-project-objective/project-objective.service";
import {ProjectWorkflowStepService} from "./services/user_services/user-project-workflow-step/project-workflow-step.service";
import {ProjectTaskService} from "./services/user_services/user_project-task/project-task.service";
import {UserProjectTeamMembersService} from "./services/user_services/user-project-team-members/user-project-team-members.service";
import {ViewTaskDetailsComponent} from './components/user-components/view-task-details/view-task-details.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCommonModule, MatDialogModule,} from "@angular/material";
import {ViewTaskCommentsService} from "./services/user_services/user-view-task-comment/view-task-comments.service";
import {ViewUserOrganisationComponent} from './components/admin-components/view-user-organisation/view-user-organisation.component';
import { ViewCourseOrganisationComponent } from './components/admin-components/view-course-organisation/view-course-organisation.component';
import { ViewModuleOrganisationComponent } from './components/admin-components/view-module-organisation/view-module-organisation.component';
import { ViewTeamMembersComponent } from './components/user-components/view-team-members/view-team-members.component';
import { ViewProjectMoreDetailsComponent } from './components/user-components/view-project-more-details/view-project-more-details.component';
import { ViewProjectCommentComponent } from './components/user-components/view-project-comment/view-project-comment.component';

const appRoutes: Routes = [

  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginFormComponent},
  {path: 'home', canActivate: [AuthenticationGuard], component: HomeAdminComponent},
  {path: 'add/user',canActivate: [AuthenticationGuard], component: AddUserComponent},
  {path: 'view/user',canActivate: [AuthenticationGuard], component: ViewUserComponent},
  {path: 'view/organisation',canActivate: [AuthenticationGuard], component: ViewOrganisationComponent},
  {path: 'view/module',canActivate: [AuthenticationGuard], component: ViewModuleComponent},
  {path: 'view/module/organisation',canActivate: [AuthenticationGuard], component: ViewModuleOrganisationComponent},
  {path: 'view/course',canActivate: [AuthenticationGuard], component: ViewCourseComponent},
  {path: 'view/course/organisation',canActivate: [AuthenticationGuard], component: ViewCourseOrganisationComponent},
  {path: 'add/organisation',canActivate: [AuthenticationGuard], component: AddOrganisationComponent},
  {path: 'add/module',canActivate: [AuthenticationGuard], component: AddModuleComponent},
  {path: 'add/course',canActivate: [AuthenticationGuard], component: AddCourseComponent},
  {path: 'view/userCourse',canActivate: [AuthenticationGuard], component: ViewUserCourseComponent},
  {path: 'view/userModule',canActivate: [AuthenticationGuard], component: ViewUserModuleComponent},
  {path: 'edit/user',canActivate: [AuthenticationGuard], component: EditUserComponent},
  {path: 'add/project',canActivate: [AuthenticationGuard], component: AddProjectComponent},
  {path: 'view/all/project',canActivate: [AuthenticationGuard], component: ViewAllProjectComponent},
  {path: 'dashboard',canActivate: [AuthenticationGuard], component: DashboardComponent},
  {path: 'user/profile',canActivate: [AuthenticationGuard], component: ProfileUserComponent},
  {path: 'admin/profile',canActivate: [AuthenticationGuard], component: ProfileAdminComponent},
  {path: 'view/project/details/:projectId',canActivate: [AuthenticationGuard], component: ViewProjectDetailsComponent},
  {path: 'view/task/details/:projectId/:taskId',canActivate: [AuthenticationGuard], component: ViewTaskDetailsComponent},
  {path: 'view/userOrganisation',canActivate: [AuthenticationGuard], component: ViewUserOrganisationComponent}
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
    ViewUserModuleComponent,
    ViewProjectDetailsComponent,
    ViewTaskDetailsComponent,
    ViewUserOrganisationComponent,
    ViewCourseOrganisationComponent,
    ViewModuleOrganisationComponent,
    ViewTeamMembersComponent,
    ViewProjectMoreDetailsComponent,
    ViewProjectCommentComponent

  ], entryComponents: [
    ViewTaskDetailsComponent,
    ViewTeamMembersComponent,
    ViewProjectMoreDetailsComponent,
    ViewProjectCommentComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCommonModule

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  providers: [
    ViewTaskCommentsService,
    UserModelService,
    UserProjectService,
    UserProjectTeamMembersService,
    ProjectCommentService,
    ProjectGoalService,
    ProjectObjectiveService,
    ProjectWorkflowStepService,
    ProjectTaskService,
    UserModelService,
    UserService,
    OrganisationService,
    ModuleService,
    UserTypeService,
    CourseService,
    AuthenticationGuard,
    HttpClientModule,
    HttpClient],
  bootstrap: [AppComponent]
})

export class AppModule implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}


