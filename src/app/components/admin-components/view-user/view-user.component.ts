import {Component} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';

import {UserService} from '../../../services/admin-services/user/user.service';
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {

  users;
  organisationName;
  organisationId;

  constructor(private router: Router, private user: UserService,private organisationService:OrganisationService) {
  }
  ngOnInit() {
    this.retrieveUsers();
  }
  retrieveUsers() {
    this.user.getAllUsers().subscribe(data => {
      this.organisationId = data[0].organisation_id;
      this.retrieveOrganisationNameById();
      this.users = data;
    })
  }

  retrieveOrganisationNameById(){
    this.organisationService.getOrganisationNameById(this.organisationId).subscribe(data=>{
      this.organisationName = data[0].organisation_name;
    })
  }


}
