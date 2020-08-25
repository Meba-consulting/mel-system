import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNewReportComponent } from './upload-new-report.component';

describe('UploadNewReportComponent', () => {
  let component: UploadNewReportComponent;
  let fixture: ComponentFixture<UploadNewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
