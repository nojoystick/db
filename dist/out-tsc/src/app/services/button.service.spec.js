import { TestBed } from '@angular/core/testing';
import { ButtonService } from './button.service';
describe('ButtonService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ButtonService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=button.service.spec.js.map