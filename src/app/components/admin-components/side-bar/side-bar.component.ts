import { Component, OnInit } from '@angular/core';
import {UserModelService} from "../../../services/user_services/user-model/user-model.service";


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],

})
export class SideBarComponent implements OnInit {

  constructor(private _currentUser: UserModelService) {
  }

  ngOnInit() {

  }
}

