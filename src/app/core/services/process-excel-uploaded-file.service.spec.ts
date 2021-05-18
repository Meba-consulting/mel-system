import { TestBed } from '@angular/core/testing';

import { ProcessExcelUploadedFileService } from './process-excel-uploaded-file.service';

describe('ProcessExcelUploadedFileService', () => {
  let service: ProcessExcelUploadedFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessExcelUploadedFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
