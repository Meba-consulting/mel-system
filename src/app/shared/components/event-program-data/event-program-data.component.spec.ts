import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProgramDataComponent } from './event-program-data.component';

describe('EventProgramDataComponent', () => {
  let component: EventProgramDataComponent;
  let fixture: ComponentFixture<EventProgramDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProgramDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProgramDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
