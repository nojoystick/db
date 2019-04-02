import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  constructor(private bluetoothSerial: BluetoothSerial) { }

  pack(channel:number, value:number)
  {
    //high byte: channel
    channel = channel & 0x11111111;
    channel = channel << 8;
    //low byte: value
    value = value & 0x11111111;
    this.write(channel+value);
  }
  write(out:number){ this.bluetoothSerial.write(out).then(this.success, this.failure); }
  success(){ console.log("success")};
  failure(){ console.log("failure")};

}
