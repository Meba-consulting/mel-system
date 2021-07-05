import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlaygroundVisualizationComponent } from './current-playground-visualization.component';

describe('CurrentPlaygroundVisualizationComponent', () => {
  let component: CurrentPlaygroundVisualizationComponent;
  let fixture: ComponentFixture<CurrentPlaygroundVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPlaygroundVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPlaygroundVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
