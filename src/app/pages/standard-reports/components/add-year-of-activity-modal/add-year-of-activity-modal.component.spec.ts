import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearOfActivityModalComponent } from './add-year-of-activity-modal.component';

describe('AddYearOfActivityModalComponent', () => {
  let component: AddYearOfActivityModalComponent;
  let fixture: ComponentFixture<AddYearOfActivityModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddYearOfActivityModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYearOfActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
