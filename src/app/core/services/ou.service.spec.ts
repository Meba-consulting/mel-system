import { TestBed } from '@angular/core/testing';

import { OuService } from './ou.service';

describe('OuService', () => {
  let service: OuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
