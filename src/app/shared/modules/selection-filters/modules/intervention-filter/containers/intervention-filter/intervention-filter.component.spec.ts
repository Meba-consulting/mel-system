import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionFilterComponent } from './intervention-filter.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from 'src/app/core/store/reducers';
import { effects } from 'src/app/core/store/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('InterventionFilterComponent', () => {
  let component: InterventionFilterComponent;
  let fixture: ComponentFixture<InterventionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatButtonModule,
        MatTooltipModule,
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects)
      ],
      declarations: [InterventionFilterComponent]
    }).compileComponents();
  }));

  it('should create', () => {
    // TODO: Fix tests issues for intervention component
    // fixture = TestBed.createComponent(InterventionFilterComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
    // expect(component).toBeTruthy();
  });
});
