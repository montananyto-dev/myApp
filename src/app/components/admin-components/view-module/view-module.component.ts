import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ModuleService} from '../../../services/module/module.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.css']
})
export class ViewModuleComponent implements OnInit {

  modules;

  constructor(private router: Router, private module: ModuleService, private http: HttpClient) {

    this.modules = this.module.getModules();

  }

  ngOnInit() {

  }

}
