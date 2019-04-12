/*
 * Tab 2 - Search
 *
 * Functions:
 * * Search database for a UI
 * * View UI in detail view and save it
 *
 * Routes:
 * * UIDetailView
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  publishedUI:any = [];
  searchKey = "";
  constructor(public dataService:DataService){
    this.publishedUI = this.dataService.getPublishedUI();  
  }
}
