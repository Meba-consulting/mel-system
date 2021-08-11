import { TestBed } from '@angular/core/testing';

import { GeneralReportsService } from './general-reports.service';

describe('GeneralReportsService', () => {
  let service: GeneralReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
