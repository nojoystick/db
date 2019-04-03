import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DeleteModalPage } from './delete-modal.page';
var routes = [
    {
        path: '',
        component: DeleteModalPage
    }
];
var DeleteModalPageModule = /** @class */ (function () {
    function DeleteModalPageModule() {
    }
    DeleteModalPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DeleteModalPage]
        })
    ], DeleteModalPageModule);
    return DeleteModalPageModule;
}());
export { DeleteModalPageModule };
//# sourceMappingURL=delete-modal.module.js.map