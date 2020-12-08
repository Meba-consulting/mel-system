import { TestBed } from '@angular/core/testing';

import { SystemIdsService } from './system-ids.service';

describe('SystemIdsService', () => {
  let service: SystemIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
