import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageDataEntryComponent } from './program-stage-data-entry.component';

describe('ProgramStageDataEntryComponent', () => {
  let component: ProgramStageDataEntryComponent;
  let fixture: ComponentFixture<ProgramStageDataEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramStageDataEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageDataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
