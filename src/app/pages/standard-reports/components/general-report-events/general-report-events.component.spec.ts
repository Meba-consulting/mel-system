import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportEventsComponent } from './general-report-events.component';

describe('GeneralReportEventsComponent', () => {
  let component: GeneralReportEventsComponent;
  let fixture: ComponentFixture<GeneralReportEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
