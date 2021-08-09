import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralReportHomeComponent } from './general-report-home.component';

describe('GeneralReportHomeComponent', () => {
  let component: GeneralReportHomeComponent;
  let fixture: ComponentFixture<GeneralReportHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralReportHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
