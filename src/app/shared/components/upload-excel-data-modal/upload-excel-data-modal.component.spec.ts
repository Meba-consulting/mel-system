import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExcelDataModalComponent } from './upload-excel-data-modal.component';

describe('UploadExcelDataModalComponent', () => {
  let component: UploadExcelDataModalComponent;
  let fixture: ComponentFixture<UploadExcelDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadExcelDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadExcelDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
