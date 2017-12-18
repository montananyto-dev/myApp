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

  organisations;
  organisationDataJson: any;

  constructor(private router: Router, private organisation: OrganisationService, private http: HttpClient) {
  }

  ngOnInit() {

    this.retrieveOrganisations();


  }
  retrieveOrganisations(){

    this.organisation.getOrganisations().subscribe(data => {
    this.organisationDataJson = data;
    this.organisations = data;

  })}

}






