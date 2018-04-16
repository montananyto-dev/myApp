import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModuleService} from "../../../services/admin-services/module/module.service";

@Component({
  selector: 'app-view-user-module',
  templateUrl: './view-user-module.component.html',
  styleUrls: ['./view-user-module.component.css']
})
export class ViewUserModuleComponent implements OnInit {

  modules;
  users;
  moduleDataJson: any;
  usersDataJson: any;
  viewUserByModuleApi = "http://slim.kingstonse.org/view/user/module/";

  displayUsers: boolean = false;

  constructor(private moduleService: ModuleService, private http: HttpClient) {
  }

  ngOnInit() {
    this.retrieveModules();
  }


  retrieveUsersFromModule(moduleId) {
    console.log('moduleID: ' + moduleId);
    this.http.get(this.viewUserByModuleApi + moduleId).subscribe(object => {

      if (object.toLocaleString().includes("No users for this module")) {
        this.users = "No users for this module";
        this.displayUsers = false;
      } else {
        this.usersDataJson = object;
        this.users = this.usersDataJson;
        this.displayUsers = true;
      }
    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");

    });
  }

  retrieveModules() {
    this.moduleService.getAllModules().subscribe(data => {
      this.moduleDataJson = data;
      this.modules = data;
    })
  }

}
