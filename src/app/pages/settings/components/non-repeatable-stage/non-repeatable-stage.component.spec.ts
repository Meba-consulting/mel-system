import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonRepeatableStageComponent } from './non-repeatable-stage.component';

describe('NonRepeatableStageComponent', () => {
  let component: NonRepeatableStageComponent;
  let fixture: ComponentFixture<NonRepeatableStageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonRepeatableStageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonRepeatableStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
