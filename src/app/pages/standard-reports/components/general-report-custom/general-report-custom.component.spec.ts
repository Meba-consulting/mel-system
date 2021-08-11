import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportCustomComponent } from './general-report-custom.component';

describe('GeneralReportCustomComponent', () => {
  let component: GeneralReportCustomComponent;
  let fixture: ComponentFixture<GeneralReportCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
