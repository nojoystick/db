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
import { UIService } from '../services/ui.service';
import { ObjectService } from '../services/object.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {DragulaService} from 'ng2-dragula';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-add-ui2',
  templateUrl: './add-ui2.page.html',
  styleUrls: ['./add-ui2.page.scss'],
})
export class AddUI2Page implements OnInit {

 
  UI_Default:UIService;
  objects:Array<ObjectService> = [];
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  

  constructor(public router:Router, private dragulaService: DragulaService, private toastController: ToastController) {

    this.UI_Default = new UIService("Default", false);

    

    this.dragulaService.createGroup('items', {
      copy: (el, source) => {
        return source.id === 'fab';
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        return target.id !== 'fab';
      }
    });

    
   }
   

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(["/add-ui1"]);
  }
}
