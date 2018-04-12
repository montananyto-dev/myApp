import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css'],

})
export class SidebarAdminComponent implements OnInit {

  constructor(private _currentUser: UserModelService) {
  }

  ngOnInit() {

  }
}

