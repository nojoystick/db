import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
var SpacerService = /** @class */ (function (_super) {
    tslib_1.__extends(SpacerService, _super);
    function SpacerService(width, height) {
        var _this = this;
        var type = "spacer";
        _this = _super.call(this, type, width, height, 0, 0) || this;
        return _this;
    }
    SpacerService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Number, Number])
    ], SpacerService);
    return SpacerService;
}(ObjectService));
export { SpacerService };
//# sourceMappingURL=spacer.service.js.map