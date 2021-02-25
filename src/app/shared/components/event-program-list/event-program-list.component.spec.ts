import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventProgramListComponent } from './event-program-list.component';

describe('EventProgramListComponent', () => {
  let component: EventProgramListComponent;
  let fixture: ComponentFixture<EventProgramListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventProgramListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventProgramListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
