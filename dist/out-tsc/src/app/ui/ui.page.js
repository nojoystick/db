/*
 * UI page
 *
 * Functions:
 * * Use UI to transmit over BLE to device
 * * Delete UI
 *
 * Routes:
 * * Home page (Tab1)
 *
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DeleteModalPage } from '../modals/delete-modal/delete-modal.page';
import { UIService } from '../services/ui.service';
import { DataService } from '../services/data.service';
import { BluetoothService } from '../services/bluetooth.service';
var UIPage = /** @class */ (function () {
    function UIPage(router, modalController, data, bleService) {
        this.router = router;
        this.modalController = modalController;
        this.data = data;
        this.bleService = bleService;
        this.NUM_ROWS = 8;
        this.NUM_COLS = 4;
        this.rows = [1, 2, 3, 4, 5, 6, 7, 8];
        this.cols = [1, 2, 3, 4];
        this.objects = [];
        this.sizes = [];
        this.values = [];
        this.UI = new UIService("Sample", false);
        this.UI.objectFactory("button", 1, 1, 1, 10);
        this.UI.objectFactory("button", 1, 4, 4, 13);
        this.UI.objectFactory("switch", 2, 3, 5, 0, 1);
        this.UI.objectFactory("switch", 2, 2, 6, 0, 5);
        this.UI.objectFactory("switch", 3, 3, 7, 0, 10);
        this.UI.objectFactory("switch", 3, 4, 8, 0, 15);
        this.UI.objectFactory("slider", 4, 1, 9, 0);
        this.UI.objectFactory("button", 7, 1, 10, 20);
        this.UI.objectFactory("button", 7, 2, 11, 20);
        this.UI.objectFactory("switch", 7, 3, 12, 0, 20);
        this.UI.objectFactory("switch", 8, 1, 13, 0, 20);
        this.UI.objectFactory("button", 8, 2, 14, 20);
        this.UI.objectFactory("button", 8, 3, 15, 20);
        for (var i = 0; i < this.NUM_ROWS; i++)
            this.rows[i] = i + 1;
        for (var i = 0; i < this.NUM_COLS; i++)
            this.cols[i] = i + 1;
        if (bleService.peripheral == null)
            bleService.showAlert("No device connected", "Connect a device in settings to use this UI");
    }
    UIPage.prototype.ngOnInit = function () {
        this.objects = this.UI.getObjects();
        this.sortObjects();
        for (var i = 0; i < this.objects.length; i++) {
            var temp = this.objects[i];
            var r = temp.getRow();
            var c = temp.getCol();
            if (!this.sizes[r])
                this.sizes[r] = [];
            this.sizes[r][c] = temp.getWidth();
            if (!this.values[r])
                this.values[r] = [];
            this.values[r][c] = { 'value': temp.getValue() };
            if (temp.getType() == 'switch') {
                var switchTemp = temp;
                this.values[r][c].value2 = switchTemp.getOnVal();
            }
        }
    };
    UIPage.prototype.sortObjects = function () {
        //order by row, column
        this.objects.sort(function (obj1, obj2) {
            return obj1.getCol() - obj2.getCol();
        });
        this.objects.sort(function (obj1, obj2) {
            return obj1.getRow() - obj2.getRow();
        });
    };
    UIPage.prototype.handler = function (channel, row, col, value) {
        //more of this new style of method overloading
        if (value == null) {
            var tempValue = this.values[row][col];
            var value;
            //switch
            if (tempValue.value2 != null) {
                if (tempValue.bool == true)
                    value = tempValue.value2;
                else
                    value = tempValue.value;
            }
            //slider
            else {
                value = tempValue.value;
            }
        }
        this.bleService.pack(channel, value);
    };
    UIPage.prototype.goBack = function () { this.router.navigate(['/tabs/tab1']); };
    UIPage.prototype.deletePopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = { message: 'modal page works' };
                        return [4 /*yield*/, this.modalController.create({
                                showBackdrop: true,
                                backdropDismiss: true,
                                cssClass: 'del-modal',
                                component: DeleteModalPage,
                                componentProps: { value: data }
                            })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UIPage = tslib_1.__decorate([
        Component({
            selector: 'app-ui',
            templateUrl: './ui.page.html',
            styleUrls: ['./ui.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ModalController,
            DataService,
            BluetoothService])
    ], UIPage);
    return UIPage;
}());
export { UIPage };
//# sourceMappingURL=ui.page.js.map