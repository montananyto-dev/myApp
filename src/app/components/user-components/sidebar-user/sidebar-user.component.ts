import { Component, OnInit } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar-user.component.html',
  styleUrls: ['./sidebar-user.component.css']
})
export class SidebarUserComponent implements OnInit {

  constructor(private router:RouterModule) { }

  ngOnInit() {
  }

}
