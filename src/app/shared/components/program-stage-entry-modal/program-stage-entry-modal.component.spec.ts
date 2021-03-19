import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageEntryModalComponent } from './program-stage-entry-modal.component';

describe('ProgramStageEntryModalComponent', () => {
  let component: ProgramStageEntryModalComponent;
  let fixture: ComponentFixture<ProgramStageEntryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramStageEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
