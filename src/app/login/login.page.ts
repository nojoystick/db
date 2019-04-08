/*
 * Login page
 *
 * Functions:
 * * Log in with email, google, facebook
 *
 * Routes:
 * * Signup page
 */

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router} from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  new_item_form: FormGroup;
  user: any;
  constructor(private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.new_item_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  loginGoogle(){
    var self=this;
    console.log("google login")
    // Using a popup.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithPopup(provider).then(function(result) {
   // This gives you a Google Access Token.
   var token = result.credential.providerId;
   // The signed-in user info.
   var user = result.user;
   console.log(user);
   console.log("login succeeded")
   self.router.navigate(["/tabs/tab1"]);
  });
}

loginFacebook(){
  //You need to create an facebook develop account and register an app there
  //to use its login service

  var self=this;
    console.log("facebook login")
    // Sign in using a popup.
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('user_birthday');
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token.
    var token = result.credential.providerId;
    console.log(token)
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    self.router.navigate(["/tabs/tab1"]);
  });

}
signup(){
  this.router.navigate(["/signup"]);
}

login(value){
  var self=this;
  firebase.auth().signInWithEmailAndPassword(value.email, value.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);

  if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else if (errorCode === 'auth/user-not-found'){
          alert("User does not exist");
        }
        console.log(error);
  }
).then((result)=>{
    
    // var user = result.user;
    
    this.user = result;
    console.log(this.user.user.email);
    self.router.navigate(["/tabs/tab1"]);
});
}
}
