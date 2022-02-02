import { TestBed } from '@angular/core/testing';

import { InterpretationsService } from './interpretations.service';

describe('InterpretationsService', () => {
  let service: InterpretationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterpretationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
