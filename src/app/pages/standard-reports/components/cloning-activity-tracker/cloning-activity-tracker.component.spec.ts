import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloningActivityTrackerComponent } from './cloning-activity-tracker.component';

describe('CloningActivityTrackerComponent', () => {
  let component: CloningActivityTrackerComponent;
  let fixture: ComponentFixture<CloningActivityTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloningActivityTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloningActivityTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
