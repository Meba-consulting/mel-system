import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramSectionComponent } from './program-section.component';

describe('ProgramSectionComponent', () => {
  let component: ProgramSectionComponent;
  let fixture: ComponentFixture<ProgramSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
