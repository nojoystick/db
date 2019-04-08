import * as tslib_1 from "tslib";
/*
 * AddUI2 page
 *
 * Functions:
 * * Menu bar with list of items to add
 * * Drag and drop on canvas
 * * Delete item by dragging to trash
 * * After an item is placed, a popup (varying based
 * *    on object type) will prompt the user to enter
 * *    channel value, upper and lower bound etc
 * * Continue will finish and save UI
 *
 * Routes:
 * * Home page (Tab1)
 * * AddUI1
 */
import { UIService } from '../services/ui.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { ButtonService } from '../services/button.service';
import { SwitchService } from '../services/switch.service';
import { SliderService } from '../services/slider.service';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
var AddUI2Page = /** @class */ (function () {
    function AddUI2Page(router, dragulaService, toastController, alertCtrl) {
        var _this = this;
        this.router = router;
        this.dragulaService = dragulaService;
        this.toastController = toastController;
        this.alertCtrl = alertCtrl;
        this.currObjectContainer = [];
        this.subs = new Subscription();
        this.objects = [];
        this.rows = [1, 2, 3, 4, 5, 6, 7, 8];
        this.cols = [1, 2, 3, 4];
        this.hide = false;
        this.iontype = '';
        this.isDropped = false;
        this.objects.push(new ButtonService(0, 0));
        this.objects.push(new SwitchService(0, 0, 0));
        this.objects.push(new SliderService(0, 0));
        this.UI = new UIService("Test", false);
        this.dragulaService.createGroup('items', {
            copy: function (el, source) {
                _this.iontype = el.tagName;
                _this.isDropped = false;
                return source.id === 'fab';
            },
            accepts: function (el, target, source, sibling) {
                // To avoid dragging from right to left container
                return target.id !== 'fab';
            }
        });
        this.subs.add(dragulaService.drop("items")
            .subscribe(function (_a) {
            var el = _a.el, target = _a.target;
            if (target != null) { // In case it drops in 'fab' id
                _this.isDropped = true;
                _this.hide = false;
                //  console.log("YEET" + target.id + "ROW: " + target.parentElement.id);
                if (el.tagName == "ION-TOGGLE") {
                    if (el.getAttribute("tag") == null) { // New Button/Toggle
                        var randomId = Math.floor(Math.random() * 100);
                        _this.presentTogglePrompt(randomId, "toggle", parseInt(target.parentElement.id), parseInt(target.id));
                        el.setAttribute("tag", String(randomId));
                        console.log(_this.currObjectContainer);
                    }
                    else { // After you place it, and if you want to move it again, changed rows and col will be updated.
                        _this.currObjectContainer.forEach(function (data) {
                            if (el.getAttribute("tag") == data.id) {
                                if (target.id != data.col || target.parentElement.id != data.row) {
                                    data.col = target.id;
                                    data.row = target.parentElement.id;
                                }
                            }
                        });
                        console.log(_this.currObjectContainer);
                    }
                } ///////////// BELOW IS BUTTONS AND SLIDER ABOVE IS TOGGLE
                else {
                    if (el.getAttribute("tag") == null) {
                        var randomId = Math.floor(Math.random() * 600) + 100;
                        _this.presentAlertPrompt(randomId, el.tagName == "ION-BUTTON" ? "button" : "slider", parseInt(target.parentElement.id), parseInt(target.id));
                        el.setAttribute("tag", String(randomId));
                        console.log(_this.currObjectContainer);
                        //
                    }
                    else {
                        _this.currObjectContainer.forEach(function (data) {
                            if (el.getAttribute("tag") == data.id) {
                                if (target.id != data.col || target.parentElement.id != data.row) {
                                    data.col = target.id;
                                    data.row = target.parentElement.id;
                                }
                            }
                        });
                        console.log(_this.currObjectContainer);
                    }
                }
            }
        }));
    }
    AddUI2Page.prototype.presentAlertPrompt = function (randomId, type, row, col) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Enter Channel&Value',
                            inputs: [
                                {
                                    name: 'Channel',
                                    type: 'text',
                                    placeholder: 'Channel'
                                },
                                {
                                    name: 'Value',
                                    type: 'text',
                                    value: '',
                                    placeholder: 'Value'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        console.log('Confirm Ok');
                                        _this.currObjectContainer.push({ id: randomId, type: type, row: row, col: col, channel: data.Channel, value: data.Value });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddUI2Page.prototype.presentTogglePrompt = function (randomId, type, row, col) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Enter Channel&Value',
                            inputs: [
                                {
                                    name: 'Channel',
                                    type: 'text',
                                    placeholder: 'Channel'
                                },
                                {
                                    name: 'Value',
                                    type: 'text',
                                    value: '',
                                    placeholder: 'Value1'
                                },
                                {
                                    name: 'Value2',
                                    type: 'text',
                                    value: '',
                                    placeholder: 'Value2'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        console.log('Confirm Ok');
                                        _this.currObjectContainer.push({ id: randomId, type: type, row: row, col: col, channel: data.Channel, value: data.Value, value2: data.Value2 });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddUI2Page.prototype.ngOnInit = function () {
    };
    AddUI2Page.prototype.goBack = function () {
        this.router.navigate(["/add-ui1"]);
    };
    AddUI2Page.prototype.publish = function () {
        var _this = this;
        this.currObjectContainer.forEach(function (data) {
            if (data.type == "toggle") {
                _this.UI.objectFactory(data.type, data.row, data.col, data.channel, data.value, data.value2);
            }
            else {
                _this.UI.objectFactory(data.type, data.row, data.col, data.channel, data.value);
            }
        });
        console.log(this.UI.getObjects());
    };
    AddUI2Page.prototype.ngIfCtrl = function () {
        this.hide = !this.hide;
    };
    AddUI2Page = tslib_1.__decorate([
        Component({
            selector: 'app-add-ui2',
            templateUrl: './add-ui2.page.html',
            styleUrls: ['./add-ui2.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, DragulaService, ToastController, AlertController])
    ], AddUI2Page);
    return AddUI2Page;
}());
export { AddUI2Page };
//# sourceMappingURL=add-ui2.page.js.map