/*
 * Tab 1 - Home
 *
 * Functions:
 * * List of saved UIs
 * * Open UI to use it
 *
 * Routes:
 * * AddUI page
 * * UI page
 *
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
      private router: Router)
  {
  }
  openUIPage()
  {
  	this.router.navigate(["/ui"]);
  }


  addUI(){
    this.router.navigate(["/add-ui1"]);
  }
}
