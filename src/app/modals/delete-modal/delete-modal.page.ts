import { Component, OnInit, Input } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})

export class DeleteModalPage implements OnInit {
value:any;
  constructor(private nav:NavController,
              private navParams:NavParams, 
  	          private modalController: ModalController,
  	          private data: DataService,
  	          private router: Router) 
  {
    this.value = this.navParams.get('value');
  }

  ngOnInit() {}

  closeModal() { this.modalController.dismiss(); }

  deleteUI()
  {
    //this.data.deleteUI(currentItem);
    this.closeModal();
    this.data.deleteById(this.value);
    this.router.navigate(['/tabs/tab1']);
  }

  editUI()
  {
  	//this.data.editUI(currentItem);
  	//TODO: edit options: name, published
  }

  infoPage()
  {
  	//TODO: view detail info here
  }
}
