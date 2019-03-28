import { TestBed } from '@angular/core/testing';

import { SpacerService } from './spacer.service';

describe('SpacerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpacerService = TestBed.get(SpacerService);
    expect(service).toBeTruthy();
  });
});
