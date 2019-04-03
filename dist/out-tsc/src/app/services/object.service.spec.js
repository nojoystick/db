import { TestBed } from '@angular/core/testing';
import { ObjectService } from './object.service';
describe('ObjectService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ObjectService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=object.service.spec.js.map