import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MELHelpComponent } from './mel-help.component';

describe('MELHelpComponent', () => {
  let component: MELHelpComponent;
  let fixture: ComponentFixture<MELHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MELHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MELHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
