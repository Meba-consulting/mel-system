import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FortificationComponent } from './fortification.component';

describe('FortificationComponent', () => {
  let component: FortificationComponent;
  let fixture: ComponentFixture<FortificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FortificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FortificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
