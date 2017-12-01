import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
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

import { AuthentificationGuard } from './guards/authentification.guard';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

import { UserService } from './services/user/user.service';
import { OrganisationService } from './services/organisation/organisation.service';


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
    /*canActivate: [AuthentificationGuard], */ /* access to home page once logged in */
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
  }
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    HomeComponent,
    NavbarComponent,
    AddUserComponent,
    ViewUserComponent,
    SideBarComponent,
    ViewOrganisationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MalihuScrollbarModule.forRoot()

  ],
  providers: [UserService, OrganisationService, AuthentificationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
