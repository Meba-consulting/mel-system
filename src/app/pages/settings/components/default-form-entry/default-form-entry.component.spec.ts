import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultFormEntryComponent } from './default-form-entry.component';

describe('DefaultFormEntryComponent', () => {
  let component: DefaultFormEntryComponent;
  let fixture: ComponentFixture<DefaultFormEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultFormEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultFormEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
