import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(private _currentUser:UserModelService) { }

  ngOnInit() {

  }

}
