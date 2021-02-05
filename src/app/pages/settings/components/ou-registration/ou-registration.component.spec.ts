import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuRegistrationComponent } from './ou-registration.component';

describe('OuRegistrationComponent', () => {
  let component: OuRegistrationComponent;
  let fixture: ComponentFixture<OuRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
