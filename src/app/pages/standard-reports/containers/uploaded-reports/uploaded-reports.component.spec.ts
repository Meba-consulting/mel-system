import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedReportsComponent } from './uploaded-reports.component';

describe('UploadedReportsComponent', () => {
  let component: UploadedReportsComponent;
  let fixture: ComponentFixture<UploadedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
