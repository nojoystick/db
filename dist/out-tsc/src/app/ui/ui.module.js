import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UIPage } from './ui.page';
import { DeleteModalPageModule } from '../modals/delete-modal/delete-modal.module';
var routes = [
    {
        path: '',
        component: UIPage
    }
];
var UIPageModule = /** @class */ (function () {
    function UIPageModule() {
    }
    UIPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                IonicModule,
                DeleteModalPageModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UIPage]
        })
    ], UIPageModule);
    return UIPageModule;
}());
export { UIPageModule };
//# sourceMappingURL=ui.module.js.map