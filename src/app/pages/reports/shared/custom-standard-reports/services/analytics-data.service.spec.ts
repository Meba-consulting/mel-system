import { TestBed } from '@angular/core/testing';

import { AnalyticsDataService } from './analytics-data.service';

describe('AnalyticsDataService', () => {
  let service: AnalyticsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
