import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDhis2CustomFormsEntryComponent } from './ngx-dhis2-custom-forms-entry.component';

describe('NgxDhis2CustomFormsEntryComponent', () => {
  let component: NgxDhis2CustomFormsEntryComponent;
  let fixture: ComponentFixture<NgxDhis2CustomFormsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDhis2CustomFormsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2CustomFormsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
