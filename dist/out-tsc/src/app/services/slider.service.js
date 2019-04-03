import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
var SliderService = /** @class */ (function (_super) {
    tslib_1.__extends(SliderService, _super);
    function SliderService(channel, value) {
        var _this = this;
        var type = "slider";
        var sliderWidth = 4;
        var sliderHeight = 1;
        if (value == null)
            var value = 0;
        _this = _super.call(this, type, sliderWidth, sliderHeight, channel, value) || this;
        return _this;
    }
    SliderService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Number, Number])
    ], SliderService);
    return SliderService;
}(ObjectService));
export { SliderService };
//# sourceMappingURL=slider.service.js.map