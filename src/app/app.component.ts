import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDm18fDvdWUfuRf8G1kG9MsW79lN_XO0Mw",
    authDomain: "app546.firebaseapp.com",
    databaseURL: "https://app546.firebaseio.com",
    projectId: "app546",
    storageBucket: "",
    messagingSenderId: "306542751849"
  };

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      firebase.initializeApp(config);
    });
  }

}
