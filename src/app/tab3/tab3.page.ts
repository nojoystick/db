import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothService } from '../services/bluetooth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  devices:any[] = [];
  peripheral: any = {};
  statusMessage: string;
  showFooter = false;
  readVal = "No reading yet";

  constructor(private router: Router,
  	          public navCtrl: NavController, 
              private ble: BLE,
              private bleService: BluetoothService) 
  {}

  scan()
  {
    this.devices = [];
    this.setStatus('Scanning for available BLE devices...');
    this.devices = this.bleService.scan();
    console.log(this.devices);
    setTimeout(this.setStatus.bind(this), 5000, 'Scan complete!');
    this.readVal = "Scan completed";
  }

  setStatus(message) {
    this.showFooter = true;
    this.statusMessage = message;
    setTimeout(()=>{
      this.showFooter = false;
    }, 3000);
  }


  deviceSelected(device) {
    console.log(JSON.stringify(device) + ' selected');
    this.setStatus("Connecting to "+device.id);
    this.ble.connect(device.id).subscribe(
      peripheral => this.bleService.onConnected(peripheral),
      peripheral => this.onDisconnected(peripheral)
    );
    this.peripheral = this.bleService.peripheral;
    if(this.peripheral != null)
      this.setStatus("Device connected!");
  }

  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  onDisconnected(peripheral)
  {
    this.setStatus("Unexpectedly disconnected");
  }

  logout(){
    var self=this;

    let fireBaseUser = firebase.auth().currentUser;
    console.log(fireBaseUser.uid +" userid")


    firebase.auth().signOut().then(function() {
      console.log("logout succeed")
      self.router.navigate(["/login"]);
  // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }


}
