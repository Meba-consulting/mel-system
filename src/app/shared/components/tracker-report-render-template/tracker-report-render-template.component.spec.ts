import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerReportRenderTemplateComponent } from './tracker-report-render-template.component';

describe('TrackerReportRenderTemplateComponent', () => {
  let component: TrackerReportRenderTemplateComponent;
  let fixture: ComponentFixture<TrackerReportRenderTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerReportRenderTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerReportRenderTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
