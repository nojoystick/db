/*
 * Tab 1 - Home
 *
 * Functions:
 * * List of saved UIs
 * * Open UI to use it
 *
 * Routes:
 * * AddUI page
 * * UI page
 *
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(router) {
        this.router = router;
    }
    Tab1Page.prototype.openUIPage = function () {
        this.router.navigate(["/ui"]);
    };
    Tab1Page.prototype.addUI = function () {
        this.router.navigate(["/add-ui1"]);
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map