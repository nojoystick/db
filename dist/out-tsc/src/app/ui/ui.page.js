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
var UIPage = /** @class */ (function () {
    function UIPage(router, modalController) {
        this.router = router;
        this.modalController = modalController;
        this.NUM_ROWS = 8;
        this.NUM_COLS = 4;
        this.rows = [1, 2, 3, 4, 5, 6, 7, 8];
        this.cols = [1, 2, 3, 4];
        this.objects = [];
        this.sizes = [];
        this.values = [];
        this.data = new DataService();
        this.UI = new UIService("generic UI", false);
        /*
        for(var i = 1; i <= this.NUM_ROWS; i++)
            for(var j = 1; j <= this.NUM_COLS; j++)
                this.UI.objectFactory("spacer", i, j, 0, 0);
        */
        this.UI.objectFactory("button", 1, 1, 1, 10);
        this.UI.objectFactory("button", 1, 2, 2, 11);
        this.UI.objectFactory("button", 1, 3, 3, 12);
        this.UI.objectFactory("button", 1, 4, 4, 13);
        this.UI.objectFactory("switch", 2, 1, 5, 0, 1);
        this.UI.objectFactory("switch", 2, 2, 6, 0, 5);
        this.UI.objectFactory("switch", 3, 1, 7, 0, 10);
        this.UI.objectFactory("switch", 3, 2, 8, 0, 15);
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
        var r, c;
        for (r = 0; r <= this.NUM_ROWS; r++) {
            this.values[r] = [];
            for (c = 0; c <= this.NUM_COLS; c++)
                this.values[r][c] = { 'value': 0, 'bool': false };
        }
        //this.data.pushToFirebase(this.UI);
    }
    UIPage.prototype.ngOnInit = function () {
        this.objects = this.UI.getObjects();
        this.getSpacers();
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
        //sort by column, then sort by row
        this.objects.sort(function (obj1, obj2) {
            return obj1.getCol() - obj2.getCol();
        });
        this.objects.sort(function (obj1, obj2) {
            return obj1.getRow() - obj2.getRow();
        });
    };
    UIPage.prototype.getSpacers = function () {
        // fill object array with spacers as needed
        //where is a spacer needed?
        // -if a row is empty
        // -if slots in the middle of a row are empty
        var rowExists = false;
        for (var i = 1; i <= this.NUM_ROWS; i++) {
            for (var j = 0; j < this.objects.length; j++) {
                if (this.objects[j].getRow() == i) {
                    rowExists = true;
                    continue;
                }
            }
            if (rowExists == false) {
                this.UI.objectFactory("spacer", i, 1, 4, 1);
            }
            else {
                rowExists = false;
                //solve case 2 here
            }
        }
    };
    UIPage.prototype.handler = function (channel, row, col, value) {
        //more of this bad style of method overloading
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
        console.log("WRITING " + value + " TO CHANNEL " + channel);
    };
    UIPage.prototype.switchHandler = function (channel, row, col, ev) {
        console.log(ev);
    };
    UIPage.prototype.goBack = function () {
        this.router.navigate(['/tabs/tab1']);
    };
    UIPage.prototype.deletePopup = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var modal;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: DeleteModalPage,
                            componentProps: { value: 123 }
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
        tslib_1.__metadata("design:paramtypes", [Router, ModalController])
    ], UIPage);
    return UIPage;
}());
export { UIPage };
//# sourceMappingURL=ui.page.js.map