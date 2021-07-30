import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAggregateDataModalComponent } from './upload-aggregate-data-modal.component';

describe('UploadAggregateDataModalComponent', () => {
  let component: UploadAggregateDataModalComponent;
  let fixture: ComponentFixture<UploadAggregateDataModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAggregateDataModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAggregateDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
