import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UIDetailViewPage } from './uidetail-view.page';

const routes: Routes = [
  {
    path: '',
    component: UIDetailViewPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UIDetailViewPage]
})
export class UIDetailViewPageModule {}
