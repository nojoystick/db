//TODO:
// Get this working for the popup on the UI page
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
var DeleteModalPage = /** @class */ (function () {
    function DeleteModalPage(nav, modalController, data, router) {
        this.nav = nav;
        this.modalController = modalController;
        this.data = data;
        this.router = router;
    }
    DeleteModalPage.prototype.ngOnInit = function () { };
    DeleteModalPage.prototype.closeModal = function () { this.modalController.dismiss(); };
    DeleteModalPage.prototype.deleteUI = function () {
        //this.data.deleteUI(currentItem);
        this.closeModal();
        this.router.navigate(['/tabs/tab1']);
    };
    DeleteModalPage.prototype.editUI = function () {
        //this.data.editUI(currentItem);
        //TODO: edit options: name, published
    };
    DeleteModalPage.prototype.infoPage = function () {
        //TODO: view detail info here
    };
    DeleteModalPage = tslib_1.__decorate([
        Component({
            selector: 'app-delete-modal',
            templateUrl: './delete-modal.page.html',
            styleUrls: ['./delete-modal.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            ModalController,
            DataService,
            Router])
    ], DeleteModalPage);
    return DeleteModalPage;
}());
export { DeleteModalPage };
//# sourceMappingURL=delete-modal.page.js.map