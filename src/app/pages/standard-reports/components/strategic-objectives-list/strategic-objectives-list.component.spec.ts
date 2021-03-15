import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicObjectivesListComponent } from './strategic-objectives-list.component';

describe('StrategicObjectivesListComponent', () => {
  let component: StrategicObjectivesListComponent;
  let fixture: ComponentFixture<StrategicObjectivesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategicObjectivesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicObjectivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
