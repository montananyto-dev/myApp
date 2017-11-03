import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';


import { UserService } from './user.service';

import { AuthentificationGuard } from './authentification.guard';


const appRoutes:Routes = [
  {
    path:'',
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
    HomeComponent
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
