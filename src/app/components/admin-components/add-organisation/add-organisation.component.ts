import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators} from "@angular/forms";
import {FormControl} from '@angular/forms';
import { HttpClient } from "@angular/common/http";


@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.css']
})
export class AddOrganisationComponent implements OnInit {

  addOrganisationApi = 'http://slim.kingston.se.org/add/organisation';

  constructor(private http: HttpClient) {
  }

  organisationForm = new FormGroup({

    name: new FormControl('', Validators.pattern('^[a-zA-Z\\s]*$')),
    address: new FormControl(),
    type: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    country: new FormControl('', Validators.pattern('[a-zA-Z]+')), // input field that can contain only  letters (no numbers or special characters):
  });

  ngOnInit() {
  }

  onSubmit = function (submit) {

    console.log(JSON.stringify(submit));
    return this.http.post(this.addOrganisationApi, JSON.stringify(submit),
      {
        headers: {
          'Accept': 'application/ json',
          'Content-Type': 'application/json'
        }
      }).subscribe
    (data => {
        console.log(data);
      },
      err => {
        console.log('Error occured');
      });
  };
}
