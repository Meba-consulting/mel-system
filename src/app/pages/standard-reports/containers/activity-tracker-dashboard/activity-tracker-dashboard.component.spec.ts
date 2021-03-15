import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTrackerDashboardComponent } from './activity-tracker-dashboard.component';

describe('ActivityTrackerDashboardComponent', () => {
  let component: ActivityTrackerDashboardComponent;
  let fixture: ComponentFixture<ActivityTrackerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrackerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTrackerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
