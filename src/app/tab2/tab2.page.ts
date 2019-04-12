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
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public publishedUI:Array<any> = [];
  searchKey = "";
  userID:any;
  constructor(public dataService:DataService, public events:Events, public router: Router){
    events.subscribe('dataloaded', (time) => {
      console.log('data load time:', time);
      this.publishedUI = this.dataService.getPublishedUI(); 
      });
   
  }
  
  ngOnInit(){
    this.publishedUI = this.dataService.getPublishedUI(); 
    this.userID = this.dataService.getUserID;
    // console.log(this.publishedUI);

  }
  search= () =>{
    this.resetChanges();
    
    this.publishedUI= this.publishedUI.filter((ui)=>{
        return ui.name.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1;
        
      })
    
  }
  
  resetChanges = () =>{
    this.publishedUI = this.dataService.getPublishedUI(); 
  }

  goToDetail(ui){
    this.router.navigate(["/uidetail-view", ui]);
  }
}
