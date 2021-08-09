import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderGeneralReportComponent } from './render-general-report.component';

describe('RenderGeneralReportComponent', () => {
  let component: RenderGeneralReportComponent;
  let fixture: ComponentFixture<RenderGeneralReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderGeneralReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderGeneralReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
