import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UIDetailViewPage } from './uidetail-view.page';
var routes = [
    {
        path: '',
        component: UIDetailViewPage
    }
];
var UIDetailViewPageModule = /** @class */ (function () {
    function UIDetailViewPageModule() {
    }
    UIDetailViewPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UIDetailViewPage]
        })
    ], UIDetailViewPageModule);
    return UIDetailViewPageModule;
}());
export { UIDetailViewPageModule };
//# sourceMappingURL=uidetail-view.module.js.map