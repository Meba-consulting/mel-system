import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderReportComponent } from './render-report.component';

describe('RenderReportComponent', () => {
  let component: RenderReportComponent;
  let fixture: ComponentFixture<RenderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
