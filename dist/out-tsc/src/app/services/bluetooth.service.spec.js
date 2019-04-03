import { TestBed } from '@angular/core/testing';
import { BluetoothService } from './bluetooth.service';
describe('BluetoothService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(BluetoothService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=bluetooth.service.spec.js.map