import { Injectable, Component } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  devices: any[] = [];
  peripheral: any = {};
  statusMessage: string;
  SERV = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
  TX_CHARACTERISTIC = "6E400002-B5A3-F393-E0A9-E50E24DCCA9E";
  RX_CHARACTERISTIC = "6E400003-B5A3-F393-E0A9-E50E24DCCA9E";

  constructor(private ble: BLE,
              private alertController: AlertController,
              private alertCtrl: AlertController) {}

  scan() 
  {
    this.devices = [];
    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => console.log(error)
    );
    return this.devices;
  }

  onDeviceDiscovered(device) 
  {
    this.devices.push(device);
  }

  onConnected(peripheral) 
  {
      this.peripheral = peripheral;
  }


  pack(channel:number, value:number)
  {
    let v:string = value.toString();
    let c:string = channel.toString();
    let enc:string = c + "," + v;
    let out = <ArrayBuffer> this.stringToBytes(enc);

    this.ble.write(this.peripheral.id, this.SERV, this.TX_CHARACTERISTIC, out).then(
      () => console.log('Set value of '+this.TX_CHARACTERISTIC+' to ' + out),
      e => this.showAlert('Unexpected Error', 'Error updating characteristic ' + e)
      );
  }

    // ASCII only
  stringToBytes(string) 
  {
     var array = new Uint8Array(string.length);
     for (var i = 0, l = string.length; i < l; i++) {
         array[i] = string.charCodeAt(i);
      }
      return array.buffer;
  }

  bytesToString(buffer)
  { 
    return String.fromCharCode.apply(null, new Uint8Array(buffer)); 
  }

  async showAlert(title, message) 
  {
    const alertController = document.querySelector('ion-alert-controller');
    //await alertController.componentOnReady();

    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: ['OK']
    });

    return await alert.present();
  }

  getServ() { return this.SERV };
  getRX() { return this.RX_CHARACTERISTIC };
  getTX() { return this.TX_CHARACTERISTIC };
}
