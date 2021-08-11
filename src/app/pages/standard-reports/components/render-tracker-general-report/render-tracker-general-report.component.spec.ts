import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTrackerGeneralReportComponent } from './render-tracker-general-report.component';

describe('RenderTrackerGeneralReportComponent', () => {
  let component: RenderTrackerGeneralReportComponent;
  let fixture: ComponentFixture<RenderTrackerGeneralReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderTrackerGeneralReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTrackerGeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
