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
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var AddUI2Page = /** @class */ (function () {
    function AddUI2Page() {
    }
    AddUI2Page.prototype.ngOnInit = function () {
    };
    AddUI2Page = tslib_1.__decorate([
        Component({
            selector: 'app-add-ui2',
            templateUrl: './add-ui2.page.html',
            styleUrls: ['./add-ui2.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AddUI2Page);
    return AddUI2Page;
}());
export { AddUI2Page };
//# sourceMappingURL=add-ui2.page.js.map