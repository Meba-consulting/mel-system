import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuDataLoadingComponent } from './ou-data-loading.component';

describe('OuDataLoadingComponent', () => {
  let component: OuDataLoadingComponent;
  let fixture: ComponentFixture<OuDataLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuDataLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuDataLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
