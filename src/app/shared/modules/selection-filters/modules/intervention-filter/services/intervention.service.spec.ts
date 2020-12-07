import { TestBed } from '@angular/core/testing';

import { InterventionService } from './intervention.service';
import { HttpClientModule } from '@angular/common/http';

describe('InterventionService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InterventionService]
    })
  );

  // it('should be created', () => {
  //   const service: InterventionService = TestBed.get(InterventionService);

  //   expect(service).toBeTruthy();
  // });
});
