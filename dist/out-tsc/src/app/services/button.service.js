import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
var ButtonService = /** @class */ (function (_super) {
    tslib_1.__extends(ButtonService, _super);
    function ButtonService(channel, value) {
        var _this = this;
        var type = "button";
        var buttonHeight = 1;
        var buttonWidth = 1;
        _this = _super.call(this, type, buttonHeight, buttonWidth, channel, value) || this;
        return _this;
    }
    ButtonService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Number, Number])
    ], ButtonService);
    return ButtonService;
}(ObjectService));
export { ButtonService };
//# sourceMappingURL=button.service.js.map