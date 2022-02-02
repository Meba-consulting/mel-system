import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedVisualizationComponent } from './shared-visualization.component';

describe('SharedVisualizationComponent', () => {
  let component: SharedVisualizationComponent;
  let fixture: ComponentFixture<SharedVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
