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
  
  devices: any[] = [];
  peripheral: any = {};
  statusMessage: string;
  showFooter = false;
  readVal = "No reading yet";

  constructor(private router: Router,
  	          public navCtrl: NavController, 
              private ble: BLE,
              private bleService: BluetoothService) {}

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
      //onDisconnected() = error message ?
    );
    var data;
    this.ble.read(this.peripheral.id, '4fafc201-1fb5-459e-8fcc-c5c9c331914b', 'beb5483e-36e1-4688-b7f5-ea07361b26a8').then(
      buffer=>{
        data = this.ab2str(buffer);
        console.log('Online characteristic '+ data);
      }
      )
    this.readVal="Read from device";
    this.readVal = data;
  }

  ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
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
