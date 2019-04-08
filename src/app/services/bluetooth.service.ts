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
  SERV = '4fafc201-1fb5-459e-8fcc-c5c9c331914b'
  GENERIC_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';//'1800';

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
    console.log('Discovered ' + JSON.stringify(device, null, 2));
    this.devices.push(device);
  }

  onConnected(peripheral) 
  {
      this.peripheral = peripheral;
  }


  pack(channel:number, value:number)
  {
    let v:string = value.toString();
    let vbuffer = <ArrayBuffer> this.stringToBytes(v);

    let c:string = channel.toString();
    let cbuffer = <ArrayBuffer> this.stringToBytes(c);

    console.log("Writing: ");
    console.log(this.peripheral.id);
    console.log(this.GENERIC_CHARACTERISTIC);
    console.log(vbuffer);
    console.log(cbuffer);

    this.ble.write(this.peripheral.id, this.SERV, this.GENERIC_CHARACTERISTIC, vbuffer).then(
      () => console.log('Set value of '+this.GENERIC_CHARACTERISTIC+' to ' + vbuffer),
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
}
