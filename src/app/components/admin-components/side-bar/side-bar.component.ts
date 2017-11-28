import { Component, OnInit } from '@angular/core';
import { sidebar } from '../../../../assets/js/sidebar'; /*import js file */

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sidebar();
  }

}
