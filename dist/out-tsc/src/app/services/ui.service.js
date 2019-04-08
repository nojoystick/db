import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ButtonService } from './button.service';
import { SliderService } from './slider.service';
import { SwitchService } from './switch.service';
import { SpacerService } from './spacer.service';
var UIService = /** @class */ (function () {
    function UIService(name, isPublic) {
        this._objects = [];
        this.NUM_ROWS = 8;
        this.NUM_COLS = 4;
        this._name = name;
        this._isPublic = isPublic;
        //default: fill with spacers
        for (var i = 1; i <= this.NUM_ROWS; i++)
            for (var j = 1; j <= this.NUM_COLS; j++)
                this.objectFactory("spacer", i, j, 1, 1);
    }
    UIService.prototype.addObject = function (obj, row, col) {
        //overwrite old object at this position
        obj.setPos(row, col);
        for (var i = 0; i < this._objects.length; i++) {
            if ((this._objects[i].getRow() == row) && (this._objects[i].getCol() == col)) {
                this._objects[i] = obj;
                return;
            }
        }
        this._objects.push(obj);
    };
    UIService.prototype.addObjects = function (objs, row, col) {
        for (var i = 0; i < objs.length; i++) {
            objs[i].setPos(row[i], col[i]);
            this._objects.push(objs[i]);
        }
    };
    UIService.prototype.objectFactory = function (type, row, col, channel, value, value2) {
        var obj;
        // approximating method overloading in typescript
        // if it's a switch (two values):
        if (value2 != null) {
            obj = new SwitchService(channel, value, value2);
        }
        // if it's a 1 val object:
        else {
            switch (type) {
                case ("slider"):
                    obj = new SliderService(channel, value);
                    break;
                case ("button"):
                    obj = new ButtonService(channel, value);
                    break;
                case ("spacer"):
                    // channel and value here are used for width/height
                    obj = new SpacerService(channel, value);
                    break;
            }
        }
        this.addObject(obj, row, col);
    };
    UIService.prototype.drawVals = function () {
        var retItems = [];
        for (var i = 0; i < this._objects.length; i++)
            retItems.push(this._objects[i].getDrawVals());
        return retItems;
    };
    UIService.prototype.getObjects = function () { return this._objects; };
    UIService.prototype.getName = function () { return this._name; };
    UIService.prototype.getPublic = function () { return this._isPublic; };
    UIService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [String, Boolean])
    ], UIService);
    return UIService;
}());
export { UIService };
//# sourceMappingURL=ui.service.js.map