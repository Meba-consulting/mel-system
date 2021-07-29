import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggegateDataEntryHomeComponent } from './aggegate-data-entry-home.component';

describe('AggegateDataEntryHomeComponent', () => {
  let component: AggegateDataEntryHomeComponent;
  let fixture: ComponentFixture<AggegateDataEntryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggegateDataEntryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggegateDataEntryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
