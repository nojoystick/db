/*
 * AddUI2 page
 *
 * Functions:
 * * Menu bar with list of items to add
 * * Drag and drop on canvas
 * * Delete item by dragging to trash
 * * After an item is placed, a popup (varying based 
 * *    on object type) will prompt the user to enter
 * *    channel value, upper and lower bound etc
 * * Continue will finish and save UI
 *
 * Routes:
 * * Home page (Tab1)
 * * AddUI1
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-ui2',
  templateUrl: './add-ui2.page.html',
  styleUrls: ['./add-ui2.page.scss'],
})
export class AddUI2Page implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(["/add-ui1"]);
  }
}
