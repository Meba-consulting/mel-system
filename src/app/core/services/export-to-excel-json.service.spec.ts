import { TestBed } from '@angular/core/testing';

import { ExportToExcelJsonService } from './export-to-excel-json.service';

describe('ExportToExcelJsonService', () => {
  let service: ExportToExcelJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportToExcelJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
