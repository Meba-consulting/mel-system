import { TestBed } from '@angular/core/testing';

import { DataEntryService } from './data-entry.service';

describe('DataEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataEntryService = TestBed.get(DataEntryService);
    expect(service).toBeTruthy();
  });
});
