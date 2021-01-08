import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageDataComponent } from './program-stage-data.component';

describe('ProgramStageDataComponent', () => {
  let component: ProgramStageDataComponent;
  let fixture: ComponentFixture<ProgramStageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramStageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
