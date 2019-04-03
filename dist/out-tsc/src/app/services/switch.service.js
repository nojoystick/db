import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
var SwitchService = /** @class */ (function (_super) {
    tslib_1.__extends(SwitchService, _super);
    function SwitchService(channel, offVal, onVal) {
        var _this = this;
        var type = "switch";
        var switchWidth = 1;
        var switchHeight = 1;
        _this = _super.call(this, type, switchWidth, switchHeight, channel, offVal) || this;
        _this._onVal = onVal;
        return _this;
    }
    SwitchService.prototype.getOnVal = function () { return this._onVal; };
    SwitchService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Number, Number, Number])
    ], SwitchService);
    return SwitchService;
}(ObjectService));
export { SwitchService };
//# sourceMappingURL=switch.service.js.map