import { TestBed } from '@angular/core/testing';

import { OldReportsService } from './old-reports.service';

describe('OldReportsService', () => {
  let service: OldReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
