import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from "@angular/forms";
import {FormControl} from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {OrganisationService} from "../../../services/admin-services/organisation/organisation.service";


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

  addOrganisationApi = 'http://slim.kingstonse.org/add/organisation';
  organisationDataJson: any;
  organisationInserted:Boolean = false;

  constructor(private http: HttpClient, private organisation: OrganisationService) {
  }

  organisationForm = new FormGroup({

    organisation_name: new FormControl('', Validators.pattern('^[a-zA-Z\\s]*$')),
    organisation_address: new FormControl(),
    organisation_type: new FormControl('', Validators.pattern('^[a-zA-Z\\s]*$')),
    organisation_phone_number: new FormControl('', Validators.pattern('^\\+(?:[0-9]●?){6,14}[0-9]$')),
    organisation_email: new FormControl('', Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')),
    organisation_country: new FormControl('', Validators.pattern('^[a-zA-Z\\s]*$')), // input field that can contain only letters and spaces:
  });

  ngOnInit() {
  }



  onSubmit = function (dataForm) {

    if (this.organisationForm.valid) {
      this.http.post(this.addOrganisationApi, dataForm,
        {
          headers: {
            'Accept': 'application/ json',
            'Content-Type': 'application/json'
          }
        }).subscribe
      (data => {
          console.log(data);
          this.organisationForm.reset();
          this.retrieveOrganisations();
          this.showDivInserted();
        },
        err => {
          console.log(err);
          console.error("The organisation could not be added");
        });
    };
  }

  showDivInserted(): void {
    this.organisationInserted = true;
    setTimeout(function() {
      this.organisationInserted = false;
    }.bind(this),3000);
  }

  retrieveOrganisations(){

    this.organisation.getOrganisations().subscribe(data => {
      this.organisationDataJson = data;
    })}

}
