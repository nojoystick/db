import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
var DataService = /** @class */ (function () {
    function DataService() {
    }
    DataService.prototype.pushToFirebase = function (ui) {
        var newRef = firebase.database().ref('UIs/').push();
        newRef.set({
            'name': ui.getName(),
            'isPublic': ui.getPublic(),
            'objects': ui.getObjects()
        });
    };
    DataService.prototype.deleteById = function (id) {
        firebase.database().ref('UIs/' + id).remove();
    };
    DataService.prototype.deleteByObject = function (currentItem) {
        orders_ref.orderByChild('uid').equalTo(id).on("value", function (data) {
            data.forEach(function (data) {
                items.push({
                    'name': data.val().name,
                    'totalprice': data.val().number,
                    'price': data.val().price,
                    'date': data.val().date
                });
            });
        }, editUI(currentItem), {});
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