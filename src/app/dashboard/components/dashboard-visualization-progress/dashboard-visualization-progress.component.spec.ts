import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardVisualizationProgressComponent } from './dashboard-visualization-progress.component';

describe('DashboardVisualizationProgressComponent', () => {
  let component: DashboardVisualizationProgressComponent;
  let fixture: ComponentFixture<DashboardVisualizationProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardVisualizationProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardVisualizationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
