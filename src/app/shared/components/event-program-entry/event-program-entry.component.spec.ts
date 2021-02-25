import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProgramEntryComponent } from './event-program-entry.component';

describe('EventProgramEntryComponent', () => {
  let component: EventProgramEntryComponent;
  let fixture: ComponentFixture<EventProgramEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProgramEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProgramEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
