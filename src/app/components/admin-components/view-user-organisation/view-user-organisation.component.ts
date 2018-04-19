import { Component, OnInit } from '@angular/core';
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-view-user-organisation',
  templateUrl: './view-user-organisation.component.html',
  styleUrls: ['./view-user-organisation.component.css']
})
export class ViewUserOrganisationComponent implements OnInit {

  organisations:any;
  users:any;

  viewUserByCourseApi = "http://slim.kingstonse.org/view/user/organisation/";

  displayUsers: boolean = false;

  constructor(private organisationService: OrganisationService,private http: HttpClient) { }

  ngOnInit() {
    this.retrieveOrganisation();
  }

  retrieveUsersFromOrganisation(organisationId) {
    console.log('organisationId: ' + organisationId);
    this.http.get(this.viewUserByCourseApi + organisationId).subscribe(object => {
      if (object.toLocaleString().includes("There are no users for this organisation")) {
        this.users = "There are no users for this organisation";
        this.displayUsers = false;
      } else {
        this.users = object;
        this.displayUsers = true;
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
