import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTrackerGeneralReportModalComponent } from './render-tracker-general-report-modal.component';

describe('RenderTrackerGeneralReportModalComponent', () => {
  let component: RenderTrackerGeneralReportModalComponent;
  let fixture: ComponentFixture<RenderTrackerGeneralReportModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderTrackerGeneralReportModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTrackerGeneralReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
