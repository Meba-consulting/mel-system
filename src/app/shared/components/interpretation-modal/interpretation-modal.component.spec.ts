import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretationModalComponent } from './interpretation-modal.component';

describe('InterpretationModalComponent', () => {
  let component: InterpretationModalComponent;
  let fixture: ComponentFixture<InterpretationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
