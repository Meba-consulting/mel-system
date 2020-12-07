import { TestBed, inject } from '@angular/core/testing';

import { DynamicDimensionService } from './dynamic-dimension.service';

describe('DynamicDimensionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DynamicDimensionService]
    });
  });

  it('should be created', inject([DynamicDimensionService], (service: DynamicDimensionService) => {
    expect(service).toBeTruthy();
  }));
});
