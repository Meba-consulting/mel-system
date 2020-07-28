import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectiveActionsComponent } from './corrective-actions.component';

describe('CorrectiveActionsComponent', () => {
  let component: CorrectiveActionsComponent;
  let fixture: ComponentFixture<CorrectiveActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectiveActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
