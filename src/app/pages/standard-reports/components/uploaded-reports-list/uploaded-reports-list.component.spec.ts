import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedReportsListComponent } from './uploaded-reports-list.component';

describe('UploadedReportsListComponent', () => {
  let component: UploadedReportsListComponent;
  let fixture: ComponentFixture<UploadedReportsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadedReportsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadedReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
