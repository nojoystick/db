import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
var DataService = /** @class */ (function () {
    function DataService() {
        this.UI_ref = firebase.database().ref('UIs/');
    }
    DataService.prototype.pushToFirebase = function (ui) {
        var newRef = this.UI_ref.push();
        newRef.set({
            'name': ui.getName(),
            'isPublic': ui.getPublic(),
            'objects': ui.getObjects()
        });
    };
    DataService.prototype.deleteById = function (id) {
        firebase.database().ref('UIs/' + id).remove();
    };
    DataService.prototype.deleteUI = function (currentItem) {
        var newInfo = firebase.database().ref('UIs' + currentItem.id).remove();
    };
    DataService.prototype.deleteByName = function (name) {
        var id;
        this.UI_ref.orderByChild('name').equalTo(name).on("value", function (data) {
            data.forEach(function (data) {
                id = data.val().key;
            });
        });
        this.deleteById(id);
    };
    DataService.prototype.editUI = function (currentItem) {
        var newInfo = firebase.database().ref('UIs/' + currentItem.id).update(currentItem);
    };
    DataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map