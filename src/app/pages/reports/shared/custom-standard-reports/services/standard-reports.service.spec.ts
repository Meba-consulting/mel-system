import { TestBed } from '@angular/core/testing';

import { StandardReportsService } from './standard-reports.service';

describe('StandardReportsService', () => {
  let service: StandardReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandardReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
