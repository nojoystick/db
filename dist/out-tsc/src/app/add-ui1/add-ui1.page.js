/*
 * AddUI1 page
 *
 * Functions:
 * * Select name
 * * Select color scheme
 * * Select option to publish
 * * Continue to drag and drop screen
 *
 * Routes:
 * * Home page (Tab1)
 * * AddUI2 page
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var AddUI1Page = /** @class */ (function () {
    function AddUI1Page(router) {
        this.router = router;
        this.ui_data = {
            name: '',
            description: '',
            encoding: ''
        };
    }
    AddUI1Page.prototype.ngOnInit = function () {
    };
    AddUI1Page.prototype.goBack = function () {
        this.router.navigate(["/tabs/tab1"]);
    };
    AddUI1Page.prototype.goUI2 = function () {
        //console.log(this.ui_data);
        this.router.navigate(["/add-ui2"]);
    };
    AddUI1Page = tslib_1.__decorate([
        Component({
            selector: 'app-add-ui1',
            templateUrl: './add-ui1.page.html',
            styleUrls: ['./add-ui1.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AddUI1Page);
    return AddUI1Page;
}());
export { AddUI1Page };
//# sourceMappingURL=add-ui1.page.js.map