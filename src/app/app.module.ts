import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { UserService } from './services/users/user.service';

import { AuthentificationGuard } from './guards/authentification.guard';



const appRoutes:Routes = [
  {
    path:'login',
    component:LoginFormComponent
  },{
    path:'home',
    canActivate: [AuthentificationGuard],
    component: HomeComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginFormComponent,
    HomeComponent,
    NavbarComponent
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    FormsModule
  ],
  providers: [UserService,AuthentificationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
