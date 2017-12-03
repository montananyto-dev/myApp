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

  constructor(private router: Router,
              private org: OrganisationService,
              private http: HttpClient) {

    this.organisations = this.org.getOrganisations();
  }

  ngOnInit() {


  }
}






