import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DynamicDimensionEffects } from './dynamic-dimension.effects';

describe('DynamicDimensionEffects', () => {
  let actions$: Observable<any>;
  let effects: DynamicDimensionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicDimensionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DynamicDimensionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
