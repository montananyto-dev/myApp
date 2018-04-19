import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModuleService} from "../../../services/admin-services/module/module.service";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";

@Component({
  selector: 'app-view-user-module',
  templateUrl: './view-user-module.component.html',
  styleUrls: ['./view-user-module.component.css']
})
export class ViewUserModuleComponent implements OnInit {

  modules;
  users;
  organisationName;
  organisationId;
  viewUserByModuleApi = "http://slim.kingstonse.org/view/user/module/";
  displayUsers: boolean = false;

  constructor(private moduleService: ModuleService, private http: HttpClient, private organisationService:OrganisationService) {
  }

  ngOnInit() {
    this.retrieveModules();
  }


  retrieveUsersFromModule(moduleId) {

    this.http.get(this.viewUserByModuleApi + moduleId).subscribe(object => {
      if (object.toLocaleString().includes("There are no users for this module")) {
        this.users = "There are no users for this module";
        this.displayUsers = false;
      } else {
        this.organisationId = object[0].organisation_id;
        this.retrieveOrganisationNameById();
        this.users = object;
        this.displayUsers = true;
      }
    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");

    });
  }

  retrieveOrganisationNameById(){
    this.organisationService.getOrganisationNameById(this.organisationId).subscribe(data=>{
      this.organisationName = data[0].organisation_name;
    })
  }


  retrieveModules() {
    this.moduleService.getAllModules().subscribe(data => {
      this.modules = data;
    })
  }

}
