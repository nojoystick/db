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

@Component({
  selector: 'app-uidetail-view',
  templateUrl: './uidetail-view.page.html',
  styleUrls: ['./uidetail-view.page.scss'],
})
export class UIDetailViewPage implements OnInit {

  uniqueid:any;
  UI:UIService;

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
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: this.UI.getName()+"'s Description",
      message: this.UI.getDescription(),
      buttons: ['OK']
    });

    await alert.present();
  }

  goBack(){
    this.router.navigate(["/tabs/tab2"]);
  }
}
