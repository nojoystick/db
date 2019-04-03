import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddUI2Page } from './add-ui2.page';
var routes = [
    {
        path: '',
        component: AddUI2Page
    }
];
var AddUI2PageModule = /** @class */ (function () {
    function AddUI2PageModule() {
    }
    AddUI2PageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddUI2Page]
        })
    ], AddUI2PageModule);
    return AddUI2PageModule;
}());
export { AddUI2PageModule };
//# sourceMappingURL=add-ui2.module.js.map