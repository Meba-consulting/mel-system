import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerGeneralRegistrationComponent } from './tracker-general-registration.component';

describe('TrackerGeneralRegistrationComponent', () => {
  let component: TrackerGeneralRegistrationComponent;
  let fixture: ComponentFixture<TrackerGeneralRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerGeneralRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerGeneralRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
