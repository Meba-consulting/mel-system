import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignleValueVisualizationComponent } from './signle-value-visualization.component';

describe('SignleValueVisualizationComponent', () => {
  let component: SignleValueVisualizationComponent;
  let fixture: ComponentFixture<SignleValueVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignleValueVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignleValueVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
