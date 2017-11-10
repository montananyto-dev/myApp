import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form = new FormControl();

  constructor() { }

  ngOnInit() {
    
  }

  addUser(){
  
  }

  
}
