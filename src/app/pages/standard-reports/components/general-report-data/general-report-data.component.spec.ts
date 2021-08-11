import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportDataComponent } from './general-report-data.component';

describe('GeneralReportDataComponent', () => {
  let component: GeneralReportDataComponent;
  let fixture: ComponentFixture<GeneralReportDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
