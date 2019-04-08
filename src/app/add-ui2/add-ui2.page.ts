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
import {DragulaService} from 'ng2-dragula';
import {ToastController} from '@ionic/angular';
import { ButtonService } from '../services/button.service';
import { SwitchService } from '../services/switch.service';
import { SliderService } from '../services/slider.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-add-ui2',
  templateUrl: './add-ui2.page.html',
  styleUrls: ['./add-ui2.page.scss'],
})
export class AddUI2Page implements OnInit {

  currObjectContainer:Array<any> = [];
  subs = new Subscription();
  objects:Array<ObjectService> = [];
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  hide:boolean = false;
  iontype:string = '';
  UI:UIService;
  isDropped:boolean = false;
  toggleData: any; 
  ui1_data: any;


  constructor(public db: AngularFirestore, public router:Router, private dragulaService: DragulaService, private toastController: ToastController, private alertCtrl: AlertController, private activatedRoute: ActivatedRoute) {

    this.ui1_data = this.activatedRoute.snapshot.params;
    
    this.objects.push(new ButtonService(0, 0));
    this.objects.push(new SwitchService(0, 0, 0));
    this.objects.push(new SliderService(0, 0));

    
    this.UI = new UIService(this.ui1_data.name, this.ui1_data.publish);


    this.dragulaService.createGroup("items", {
      copy: (el, source) => {
        
        
        this.iontype = el.tagName;
        this.isDropped = false;
        
        return source.id === 'fab';
      },
      accepts: (el, target, source, sibling) => {
        // To avoid dragging from right to left container
        
        return target.id !== 'fab';
      }
    });
    
    this.subs.add(dragulaService.drop("items")
      .subscribe(({ el, target }) => {
      
       if(target != null){ // In case it drops in 'fab' id
        this.isDropped = true;
        this.hide = false;
        
        //  console.log("YEET" + target.id + "ROW: " + target.parentElement.id);
        
        
        if(el.tagName == "ION-TOGGLE"){
          if(el.getAttribute("tag") == null){ // New Button/Toggle
              let randomId = Math.floor(Math.random() * 100);
              this.presentTogglePrompt(randomId ,"toggle", parseInt(target.parentElement.id), parseInt(target.id));
              
              el.setAttribute("tag", String(randomId));
              
              
              console.log(this.currObjectContainer);
              
            }
          else{ // After you place it, and if you want to move it again, changed rows and col will be updated.
            this.currObjectContainer.forEach(data=>{
              if(el.getAttribute("tag") == data.id){ 
                if(target.id != data.col || target.parentElement.id != data.row){
                  data.col = target.id;
                  data.row = target.parentElement.id;
                }
              }
            });
            console.log(this.currObjectContainer);
          }

        } ///////////// BELOW IS BUTTONS AND SLIDER ABOVE IS TOGGLE
        else{
          if(el.getAttribute("tag") == null){
            let randomId = Math.floor(Math.random() * 600)+100;
            this.presentAlertPrompt(randomId ,el.tagName == "ION-BUTTON" ? "button": "slider", parseInt(target.parentElement.id), parseInt(target.id));
            el.setAttribute("tag", String(randomId));
            console.log(this.currObjectContainer);
            //
            }
          else{
            this.currObjectContainer.forEach(data=>{
              if(el.getAttribute("tag") == data.id){ 
                if(target.id != data.col || target.parentElement.id != data.row){
                  data.col = target.id;
                  data.row = target.parentElement.id;
                }
              }
            });
            console.log(this.currObjectContainer);
          }
        }
      }
      })
      
    );

    
   }
  
   async presentAlertPrompt(randomId:number, type:string, row:number, col:number) {
    const alert = await this.alertCtrl.create({
      header: 'Enter Channel&Value',
      inputs: [
        {
          name: 'Channel',
          type: 'text',
          placeholder: 'Channel'
        },
        {
          name: 'Value',
          type: 'text',
          value: '',
          placeholder: 'Value'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            this.currObjectContainer.push({id:randomId, type: type, row: row, col: col, channel: data.Channel, value: data.Value});
          }
        }
      ]
    });
    await alert.present();
  }
  
  async presentTogglePrompt(randomId:number, type:string, row:number, col:number) {
    const alert = await this.alertCtrl.create({
      header: 'Enter Channel&Value',
      inputs: [
        {
          name: 'Channel',
          type: 'text',
          placeholder: 'Channel'
        },
        {
          name: 'Value',
          type: 'text',
          value: '',
          placeholder: 'Value1'
        },
        {
          name: 'Value2',
          type: 'text',
          value: '',
          placeholder: 'Value2'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            
            this.currObjectContainer.push({id:randomId, type: type, row: row, col: col, channel: data.Channel, value: data.Value, value2: data.Value2});
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnDestroy() {
    this.dragulaService.destroy("items");
}
  ngOnInit() {
    
  }

  goBack(){
    this.router.navigate(["/add-ui1"]);
  }
 
  publish(){
    this.currObjectContainer.forEach(data=>{
      if(data.type == "toggle"){
        this.UI.objectFactory(data.type, data.row, data.col, data.channel, data.value, data.value2);
        
      }
      else{
        this.UI.objectFactory(data.type, data.row, data.col, data.channel, data.value);
        
      }
    })
    console.log(this.UI.getObjects());
    let ownerid = firebase.auth().currentUser.uid;
    this.db.collection('/UI_Collections').add({
      "ownerid":ownerid, 
      "name":this.ui1_data.name, 
      "description": this.ui1_data.description,
      "publish": this.ui1_data.publish,
      "objects": JSON.parse(JSON.stringify(this.UI.getObjects()))
    });
    console.log("Added to database successfully!");
    // this.router.navigate(['/tabs/tab1']);
  }



  ngIfCtrl(){
    this.hide = !this.hide;
  }



  
}
