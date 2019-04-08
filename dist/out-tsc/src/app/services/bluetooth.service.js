import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BLE } from '@ionic-native/ble/ngx';
import { AlertController } from '@ionic/angular';
var BluetoothService = /** @class */ (function () {
    function BluetoothService(ble, alertController, alertCtrl) {
        this.ble = ble;
        this.alertController = alertController;
        this.alertCtrl = alertCtrl;
        this.devices = [];
        this.peripheral = {};
        this.SERV = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
        this.GENERIC_CHARACTERISTIC = 'beb5483e-36e1-4688-b7f5-ea07361b26a8'; //'1800';
    }
    BluetoothService.prototype.scan = function () {
        var _this = this;
        var devices = [];
        this.ble.scan([], 5).subscribe(function (device) { return _this.onDeviceDiscovered(device); }, function (error) { return console.log(error); });
        return this.devices;
    };
    BluetoothService.prototype.onDeviceDiscovered = function (device) {
        console.log('Discovered ' + JSON.stringify(device, null, 2));
        this.devices.push(device);
    };
    BluetoothService.prototype.onConnected = function (peripheral) {
        this.peripheral = peripheral;
    };
    BluetoothService.prototype.pack = function (channel, value) {
        var _this = this;
        var v = value.toString();
        var vbuffer = this.stringToBytes(v);
        var c = channel.toString();
        var cbuffer = this.stringToBytes(c);
        console.log("Writing: ");
        console.log(this.peripheral.id);
        console.log(this.GENERIC_CHARACTERISTIC);
        console.log(vbuffer);
        console.log(cbuffer);
        this.ble.write(this.peripheral.id, this.SERV, this.GENERIC_CHARACTERISTIC, vbuffer).then(function () { return console.log('Set value of ' + cbuffer + ' to ' + vbuffer); }, function (e) { return _this.showAlert('Unexpected Error', 'Error updating characteristic ' + e); });
    };
    // ASCII only
    BluetoothService.prototype.stringToBytes = function (string) {
        var array = new Uint8Array(string.length);
        for (var i = 0, l = string.length; i < l; i++) {
            array[i] = string.charCodeAt(i);
        }
        return array.buffer;
    };
    BluetoothService.prototype.bytesToString = function (buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer));
    };
    BluetoothService.prototype.showAlert = function (title, message) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alertController, alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        alertController = document.querySelector('ion-alert-controller');
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: title,
                                subHeader: message,
                                buttons: ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BluetoothService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [BLE,
            AlertController,
            AlertController])
    ], BluetoothService);
    return BluetoothService;
}());
export { BluetoothService };
//# sourceMappingURL=bluetooth.service.js.map