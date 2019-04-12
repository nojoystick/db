/*
 * UIDetailView page
 *
 * Functions:
 * * Display UI information from database
 * * Option to save UI to homepage
 *
 * Routes:
 * * Search page (Tab2)
 */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UIService } from '../services/ui.service';
import { DataService } from '../services/data.service';
import { AlertController } from '@ionic/angular';
import { ObjectService } from '../services/object.service';
import { SwitchService } from '../services/switch.service';

@Component({
  selector: 'app-uidetail-view',
  templateUrl: './uidetail-view.page.html',
  styleUrls: ['./uidetail-view.page.scss'],
})
export class UIDetailViewPage implements OnInit {

  uniqueid:any;
  UI:UIService;
  NUM_ROWS:number = 8;
  NUM_COLS:number = 4;
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  objects:Array<ObjectService> = [];
  sizes:number[][] = [];
  values:any[][] = [];
  
  constructor(public route: ActivatedRoute, public router:Router, private data: DataService, public alertController: AlertController) {
    this.route.params.subscribe(
      param => {
        this.UI = this.data.idToObj(param.uniqueid),
        this.uniqueid = param.uniqueid;
      }
    )
   }

  ngOnInit() {
    this.presentAlert();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.UI.getName()+"'s Description",
      message: this.UI.getDescription(),
      buttons: ['OK']
    });

    await alert.present();
  }

  saveToDB(){
    let randomId = Math.random().toString(36).substr(2, 5);
    
    // this.data.UserUIs.forEach((ui)=>{
    //   console.log(ui);
    // })
    console.log(this.UI);
    // this.data.addToUserCollection(randomId, this.UI.getName());
    // this.router.navigate(["/tabs/tab1"]);
    
  }
  goBack(){
    this.router.navigate(["/tabs/tab2"]);
  }
}
