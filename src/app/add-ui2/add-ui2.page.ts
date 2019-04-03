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
import { ButtonService } from '../services/button.service';
import { SwitchService } from '../services/switch.service';
import { SliderService } from '../services/slider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-ui2',
  templateUrl: './add-ui2.page.html',
  styleUrls: ['./add-ui2.page.scss'],
})
export class AddUI2Page implements OnInit {

  listofItems:any=[];
  subs = new Subscription();
  objects:Array<ObjectService> = [];
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  hide:boolean = false;
  iontype:string = '';
  constructor(public router:Router, private dragulaService: DragulaService, private toastController: ToastController) {

    
    this.objects.push(new ButtonService(0, 0));
    this.objects.push(new SwitchService(0, 0));
    this.objects.push(new SliderService(0, 0,0));

    this.dragulaService.createGroup('items', {
      copy: (el, source) => {
        // console.log(el.children.);

        
        this.iontype = el.tagName;
        console.log(this.iontype);
        return source.id === 'fab';
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        
        return target.id !== 'fab';
      }
    });
    
    this.subs.add(dragulaService.drop("items")
      .subscribe(({ el }) => {
       // this.iontype = '';
      })
    );

    
   }
   

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(["/add-ui1"]);
  }
  
  ngIfCtrl(){
    this.hide = !this.hide;
  }
}
