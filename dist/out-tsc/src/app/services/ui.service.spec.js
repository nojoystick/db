import { TestBed } from '@angular/core/testing';
import { UIService } from './ui.service';
describe('UIService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(UIService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=ui.service.spec.js.map