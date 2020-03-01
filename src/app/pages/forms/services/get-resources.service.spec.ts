import { TestBed } from '@angular/core/testing';

import { GetResourcesService } from './get-resources.service';

describe('GetResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetResourcesService = TestBed.get(GetResourcesService);
    expect(service).toBeTruthy();
  });
});
