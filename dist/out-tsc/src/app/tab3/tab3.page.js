import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BLE } from '@ionic-native/ble/ngx';
import { BluetoothService } from '../services/bluetooth.service';
var Tab3Page = /** @class */ (function () {
    function Tab3Page(navCtrl, ble, bleService) {
        this.navCtrl = navCtrl;
        this.ble = ble;
        this.bleService = bleService;
        this.devices = [];
        this.peripheral = {};
        this.showFooter = false;
    }
    Tab3Page.prototype.scan = function () {
        this.devices = [];
        this.setStatus('Scanning for available BLE devices...');
        this.devices = this.bleService.scan();
        console.log(this.devices);
        setTimeout(this.setStatus.bind(this), 5000, 'Scan complete!');
    };
    Tab3Page.prototype.setStatus = function (message) {
        var _this = this;
        this.showFooter = true;
        this.statusMessage = message;
        setTimeout(function () {
            _this.showFooter = false;
        }, 3000);
    };
    Tab3Page.prototype.deviceSelected = function (device) {
        var _this = this;
        console.log(JSON.stringify(device) + ' selected');
        this.setStatus("Connecting to " + device.id);
        this.ble.connect(device.id).subscribe(function (peripheral) { return _this.bleService.onConnected(peripheral); });
        this.ble.read(this.peripheral.id, '1800', '').then(function (buffer) {
            var data = new Uint8Array(buffer);
            console.log('Online characteristic ' + data[0]);
            _this.setStatus(data);
        });
    };
    Tab3Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab3',
            templateUrl: 'tab3.page.html',
            styleUrls: ['tab3.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            BLE,
            BluetoothService])
    ], Tab3Page);
    return Tab3Page;
}());
export { Tab3Page };
//# sourceMappingURL=tab3.page.js.map