/*
 * AddUI1 page
 *
 * Functions:
 * * Select name
 * * Select color scheme
 * * Select option to publish
 * * Continue to drag and drop screen
 *
 * Routes:
 * * Home page (Tab1)
 * * AddUI2 page
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-ui1',
  templateUrl: './add-ui1.page.html',
  styleUrls: ['./add-ui1.page.scss'],
})
export class AddUI1Page implements OnInit {

  new_item_form: FormGroup;

  
  constructor(public router:Router, public formBuilder: FormBuilder) {


   }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      publish: new FormControl(''),
      description: new FormControl('', Validators.required)
    });
  }

  goBack(){
    this.router.navigate(["/tabs/tab1"]);
  }

  goUI2(value){
    //console.log(this.ui_data);
    console.log(value);
    this.router.navigate(["/add-ui2", value]);
  }
}
