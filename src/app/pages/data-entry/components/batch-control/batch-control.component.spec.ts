import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchControlComponent } from './batch-control.component';

describe('BatchControlComponent', () => {
  let component: BatchControlComponent;
  let fixture: ComponentFixture<BatchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
