/*
 * Tab 1 - Home
 *
 * Functions:
 * * List of saved UIs
 * * Open UI to use it
 *
 * Routes:
 * * AddUI page
 * * UI page
 *
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
items = [];
user = "";

  constructor(
      private router: Router,
      private data: DataService
      )
  {
    this.user = data.getUserID();
    console.log(this.user);
  }

  openUIPage(item){
    console.log(item);
    this.router.navigate(["/ui", item]);
  }


  addUI(){ this.router.navigate(["/add-ui1"]); }


  logout()
  {
    var self=this;

    let fireBaseUser = firebase.auth().currentUser;
    console.log(fireBaseUser.uid +" userid")


    firebase.auth().signOut().then(function() 
    {
      console.log("logout succeed")
      self.router.navigate(["/login"]);
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
}
