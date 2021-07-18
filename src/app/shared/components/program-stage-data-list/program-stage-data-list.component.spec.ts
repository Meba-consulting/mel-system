import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStageDataListComponent } from './program-stage-data-list.component';

describe('ProgramStageDataListComponent', () => {
  let component: ProgramStageDataListComponent;
  let fixture: ComponentFixture<ProgramStageDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramStageDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramStageDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
