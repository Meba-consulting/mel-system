import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDataEntryComponent } from './program-data-entry.component';

describe('ProgramDataEntryComponent', () => {
  let component: ProgramDataEntryComponent;
  let fixture: ComponentFixture<ProgramDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
