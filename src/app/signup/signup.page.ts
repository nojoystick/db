/*
 * Signup page
 *
 * Functions:
 * * Sign up with email / password
 *
 * Routes:
 * * Home page (Tab1)
 * * Login page
 */

import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
// import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'Firebase';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {


  // user={
  //   email:"",
  //   password:"", 
  //   type: 0
  // };
  new_item_form: FormGroup;
  constructor(private router : Router , public formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  

  signup(value){
    var self = this;
  	firebase.auth().createUserWithEmailAndPassword(value.email, value.password).catch(
  		function(err) {
	  // Handle Errors here.
      console.dir(err);
      
      if(err.code == "auth/invalid-email"){
        alert("Email Format ERROR")
        return;
      }
      if(err.code == "auth/weak-password"){
        alert("Password needs at least 6 characters!");
        return;
      }
      if(err.code == "auth/email-already-in-use"){
        alert("Email is already in used and not available!");
      }
      
	  // ...
	}).then(function(user){
      if(user != null){
        self.router.navigate(["/login"]);
      }
	});


  }
  goBack(){
    this.router.navigate(["/login"]);
  }
}

