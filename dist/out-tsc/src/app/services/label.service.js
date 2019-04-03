import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var LabelService = /** @class */ (function () {
    function LabelService(text) {
        this._type = "label";
        this._label = "text";
    }
    LabelService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [String])
    ], LabelService);
    return LabelService;
}());
export { LabelService };
//# sourceMappingURL=label.service.js.map