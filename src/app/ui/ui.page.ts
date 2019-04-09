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
import { Router, ActivatedRoute } from '@angular/router';
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
              private route: ActivatedRoute,
              public modalController: ModalController,
              private data: DataService,
              private bleService: BluetoothService
    ) { 
    this.route.params.subscribe(
        param => {
          this.UI = this.data.idToObj(param.uniqueid);
        }
      )

    // if(bleService.peripheral == null) 
    //   bleService.showAlert("No device connected",
    //     "Connect a device in settings to use this UI");
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
    this.bleService.pack(channel, value);
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
