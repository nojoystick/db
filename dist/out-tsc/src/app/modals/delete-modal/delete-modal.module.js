import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
var routes = [
    {
        path: '',
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
        })
    ], DeleteModalPageModule);
    return DeleteModalPageModule;
}());
export { DeleteModalPageModule };
//# sourceMappingURL=delete-modal.module.js.map