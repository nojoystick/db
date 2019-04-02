//TODO:
// Get this working for the popup on the UI page

import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.page.html',
  styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {

  constructor(private nav:NavController, 
  	          private modalController: ModalController,
  	          private data: DataService,
  	          private router: Router) 
  {}

  ngOnInit() {}

  closeModal() { this.modalController.dismiss(); }

  deleteUI()
  {
    //this.data.deleteUI(currentItem);
    this.closeModal();
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
