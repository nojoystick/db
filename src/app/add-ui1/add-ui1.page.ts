/*
 * AddUI1 page
 *
 * Functions:
 * * Select name
 * * Select color scheme
 * * Select option to publish
 * * Continue to drag and drop screen
 *
 * Routes:
 * * Home page (Tab1)
 * * AddUI2 page
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ui1',
  templateUrl: './add-ui1.page.html',
  styleUrls: ['./add-ui1.page.scss'],
})
export class AddUI1Page implements OnInit {

  ui_data = {
    name: '',
    description: '', 
    encoding: ''
  }
  constructor(public router:Router) { }

  ngOnInit() {
    
  }

  goBack(){
    this.router.navigate(["/tabs/tab1"]);
  }

  goUI2(){
    //console.log(this.ui_data);
    this.router.navigate(["/add-ui2"]);
  }
}
