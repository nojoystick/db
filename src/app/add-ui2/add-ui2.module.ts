import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddUI2Page } from './add-ui2.page';
import {DragulaModule} from 'ng2-dragula';

const routes: Routes = [
  {
    path: '',
    component: AddUI2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes), 
    DragulaModule
  ],
  declarations: [AddUI2Page]
})
export class AddUI2PageModule {}
