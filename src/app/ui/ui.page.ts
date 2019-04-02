/*
 * UI page
 *
 * Functions:
 * * Use UI to transmit over BLE to device
 * * Delete UI
 *
 * Routes:
 * * Home page (Tab1)
 *
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DeleteModalPage } from '../modals/delete-modal/delete-modal.page';

import { UIService } from '../services/ui.service';
import { ObjectService } from '../services/object.service';
import { SwitchService } from '../services/switch.service';
import { SpacerService } from '../services/spacer.service';
import { DataService } from '../services/data.service';
import { BluetoothService } from '../services/bluetooth.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.page.html',
  styleUrls: ['./ui.page.scss'],
})

export class UIPage implements OnInit {
  NUM_ROWS:number = 8;
  NUM_COLS:number = 4;
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  objects:Array<ObjectService> = [];
  sizes:number[][] = [];
  values:any[][] = [];
  UI:UIService;

  constructor(private router: Router,
              public modalController: ModalController,
              private data: DataService,
              private bluetoothSerial: BluetoothService
    ) 
  { 
    this.UI = new UIService("Sample", false);
    /*
    for(var i = 1; i <= this.NUM_ROWS; i++)
    	for(var j = 1; j <= this.NUM_COLS; j++)
    		this.UI.objectFactory("spacer", i, j, 0, 0);
    */
    this.UI.objectFactory("button", 1, 1, 1, 10);

    this.UI.objectFactory("button", 1, 4, 4, 13);

    this.UI.objectFactory("switch", 2, 3, 5, 0, 1);
    this.UI.objectFactory("switch", 2, 2, 6, 0, 5);
    this.UI.objectFactory("switch", 3, 3, 7, 0, 10);
    this.UI.objectFactory("switch", 3, 4, 8, 0, 15);

    this.UI.objectFactory("slider", 4, 1, 9, 0);
  
    this.UI.objectFactory("button", 7, 1, 10, 20);
    this.UI.objectFactory("button", 7, 2, 11, 20);
    this.UI.objectFactory("switch", 7, 3, 12, 0, 20);
    this.UI.objectFactory("switch", 8, 1, 13, 0, 20);
    this.UI.objectFactory("button", 8, 2, 14, 20);
    this.UI.objectFactory("button", 8, 3, 15, 20);

    for(var i = 0; i < this.NUM_ROWS; i++)
    	this.rows[i] = i+1;
    for(var i = 0; i < this.NUM_COLS; i++)
    	this.cols[i] = i+1;

    //this.data.pushToFirebase(this.UI);
  }

  ngOnInit() 
  {
    this.objects = this.UI.getObjects();
    this.sortObjects();
    for(var i = 0; i < this.objects.length; i++)
    {
      var temp = this.objects[i];
      var r = temp.getRow();
      var c = temp.getCol();
      if(!this.sizes[r]) this.sizes[r]=[];
      this.sizes[r][c] = temp.getWidth();

      if(!this.values[r]) this.values[r]=[];
      this.values[r][c] = {'value' : temp.getValue()};
      if(temp.getType() == 'switch') 
      {
          var switchTemp = <SwitchService> temp;
          this.values[r][c].value2 = switchTemp.getOnVal();
      }
    }
  }

  sortObjects()
  {
    //order by row, column
    this.objects.sort(function(obj1, obj2){
      return obj1.getCol() - obj2.getCol();
    })
    this.objects.sort(function(obj1, obj2)
    {
      return obj1.getRow() - obj2.getRow();
    });    
  }

  handler(channel:number, row:number, col:number, value?:number)
  {
    //more of this new style of method overloading
    if(value == null)
    {
      let tempValue = this.values[row][col];
      var value: number;
      //switch
      if(tempValue.value2 != null)
      {
        if(tempValue.bool == true) value = tempValue.value2;
        else value = tempValue.value;
      }
      //slider
      else{ value = tempValue.value; }
    }
    this.bluetoothSerial.pack(channel, value);
  }

  goBack(){ this.router.navigate(['/tabs/tab1']); }
  
  async deletePopup()
  {
    var data = {message: 'modal page works'};
    const modal = await this.modalController.create({
      showBackdrop: true,
      backdropDismiss: true,
      cssClass: 'del-modal',
      component: DeleteModalPage,
      componentProps: { value: data }
    });
    return await modal.present();
  }
}
