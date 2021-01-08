import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderProgramStageDataComponent } from './render-program-stage-data.component';

describe('RenderProgramStageDataComponent', () => {
  let component: RenderProgramStageDataComponent;
  let fixture: ComponentFixture<RenderProgramStageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderProgramStageDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderProgramStageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
