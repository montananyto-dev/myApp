import { Component, OnInit } from '@angular/core';
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";
import {Router} from "@angular/router";
import {CourseService} from "../../../services/admin-services/course/course.service";
import {ModuleService} from "../../../services/admin-services/module/module.service";

@Component({
  selector: 'app-view-module-organisation',
  templateUrl: './view-module-organisation.component.html',
  styleUrls: ['./view-module-organisation.component.css']
})
export class ViewModuleOrganisationComponent implements OnInit {

  modules:any;
  organisations:any;
  displayModules:boolean = false;

  constructor(private router: Router, private course: CourseService,
              private organisationService:OrganisationService,
              private moduleService:ModuleService) {
  }

  ngOnInit() {

    this.retrieveOrganisation();
  }

  retrieveModulesFromOrganisation(organisationId) {

    this.moduleService.getModuleByOrganisationId(organisationId).subscribe(object => {
      if (object.toLocaleString().includes("There are no modules for this organisation")) {
        this.modules = "There are no modules for this organisation";
        this.displayModules = false;
      } else {
        this.modules = object;
        this.displayModules = true;
      }
    }, err => {

      console.log(err);
      console.error("Could not retrieve any data");
    });
  }

  retrieveOrganisation(){
    this.organisationService.getOrganisations().subscribe(data=>{
      this.organisations = data;
    })
  }
}
