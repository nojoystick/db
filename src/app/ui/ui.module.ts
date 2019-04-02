import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UIPage } from './ui.page';
import { DeleteModalPage } from '../modals/delete-modal/delete-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UIPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UIPage, DeleteModalPage,],
  entryComponents: [DeleteModalPage]
})
export class UIPageModule {}
