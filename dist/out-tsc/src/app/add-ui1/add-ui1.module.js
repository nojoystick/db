import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddUI1Page } from './add-ui1.page';
var routes = [
    {
        path: '',
        component: AddUI1Page
    }
];
var AddUI1PageModule = /** @class */ (function () {
    function AddUI1PageModule() {
    }
    AddUI1PageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddUI1Page]
        })
    ], AddUI1PageModule);
    return AddUI1PageModule;
}());
export { AddUI1PageModule };
//# sourceMappingURL=add-ui1.module.js.map