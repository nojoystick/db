import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var ObjectService = /** @class */ (function () {
    function ObjectService(type, width, height, channel, value) {
        this._type = type;
        this._width = width;
        this._height = height;
        this._channel = channel;
        this._value = value;
    }
    ObjectService.prototype.setPos = function (row, col) {
        this._row = row;
        this._col = col;
    };
    ObjectService.prototype.addLabel = function (label) {
        this._label = label;
    };
    // return type, row, and column position needed
    // for drawing an object
    ObjectService.prototype.getDrawVals = function () {
        var retItems = [];
        retItems.push(this._type, this._row, this._col, this._width, this._height);
        return retItems;
    };
    ObjectService.prototype.getWidth = function () { return this._width; };
    ObjectService.prototype.getHeight = function () { return this._height; };
    ObjectService.prototype.getRow = function () { return this._row; };
    ObjectService.prototype.getCol = function () { return this._col; };
    ObjectService.prototype.getType = function () { return this._type; };
    ObjectService.prototype.getChannel = function () { return this._channel; };
    ObjectService.prototype.getValue = function () { return this._value; };
    ObjectService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [String, Number, Number, Number, Number])
    ], ObjectService);
    return ObjectService;
}());
export { ObjectService };
//# sourceMappingURL=object.service.js.map