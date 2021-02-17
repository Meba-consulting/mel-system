import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRepeatableEntryComponent } from './non-repeatable-entry.component';

describe('NonRepeatableEntryComponent', () => {
  let component: NonRepeatableEntryComponent;
  let fixture: ComponentFixture<NonRepeatableEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRepeatableEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRepeatableEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
