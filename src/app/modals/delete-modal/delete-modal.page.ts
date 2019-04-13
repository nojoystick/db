import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController } from '@ionic/angular';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})

export class DeleteModalPage implements OnInit {
value:any;
id:any;
  constructor(private nav:NavController,
              private navParams:NavParams, 
  	          private modalController: ModalController,
  	          private data: DataService,
  	          private router: Router,
              private alertController: AlertController) 
  {
    this.value = this.navParams.get('value');
    this.id = this.navParams.get('id');
    console.log(this.id);
    console.log(this.value);
  }

  ngOnInit() {}

  closeModal() { this.modalController.dismiss(); }

  deleteUI()
  {
    //this.data.deleteUI(currentItem);
    this.closeModal();
    this.data.deleteById(this.id);
    this.router.navigate(['/tabs/tab1']);
  }

  editUI()
  {
  	//this.data.editUI(currentItem);
  	//TODO: edit options: name, published
  }

  async infoPage()
  {
    const alert = await this.alertController.create({
      header: this.value._name,
      message: this.value._description,
      buttons: ['OK'],
      cssClass: "alert"
    });

    await alert.present();
  }
}
