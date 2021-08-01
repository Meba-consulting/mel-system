import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralRegistrationEntryPageComponent } from './general-registration-entry-page.component';

describe('GeneralRegistrationEntryPageComponent', () => {
  let component: GeneralRegistrationEntryPageComponent;
  let fixture: ComponentFixture<GeneralRegistrationEntryPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralRegistrationEntryPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralRegistrationEntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
