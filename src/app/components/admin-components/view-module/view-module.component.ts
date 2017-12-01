import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ModuleService} from '../../../services/module/module.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.css']
})
export class ViewModuleComponent implements OnInit {

  apiUrl = 'http://slim.kingstonse.org/view/module';
  moduleDataJson: any;
  modules;
  constructor(private router: Router, private mod: ModuleService, private http: HttpClient) {
  }

  ngOnInit() {this.getUsersDetails();}
  getUsersDetails() {
    return this.http.get(this.apiUrl).subscribe(object => {
      this.moduleDataJson = object;
      this.mod.setModules(this.moduleDataJson);
      this.modules = this.mod.getModules();
      console.log(this.modules);
    });
  }
}
