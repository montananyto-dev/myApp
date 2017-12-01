import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {OrganisationService} from '../../../services/organisation/organisation.service';

@Component({
  selector: 'app-view-organisation',
  templateUrl: './view-organisation.component.html',
  styleUrls: ['./view-organisation.component.css']
})
export class ViewOrganisationComponent implements OnInit {

  apiUrl = 'http://slim.kingstonse.org/view/organisation';
  organisationDataJson: any;
  organisations;
  constructor(private router: Router, private org: OrganisationService, private http: HttpClient) {
  }

  ngOnInit() {this.getUsersDetails();}
  getUsersDetails() {
      return this.http.get(this.apiUrl).subscribe(object => {
      this.organisationDataJson = object;
      this.org.setOrganisations(this.organisationDataJson);
      this.organisations = this.org.getOrganisations();
      console.log(this.organisations);
    });
  }
}






