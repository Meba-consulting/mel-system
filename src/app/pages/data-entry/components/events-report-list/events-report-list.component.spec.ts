import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReportListComponent } from './events-report-list.component';

describe('EventsReportListComponent', () => {
  let component: EventsReportListComponent;
  let fixture: ComponentFixture<EventsReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
