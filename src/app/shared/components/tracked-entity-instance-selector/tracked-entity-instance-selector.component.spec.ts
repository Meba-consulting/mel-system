import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedEntityInstanceSelectorComponent } from './tracked-entity-instance-selector.component';

describe('TrackedEntityInstanceSelectorComponent', () => {
  let component: TrackedEntityInstanceSelectorComponent;
  let fixture: ComponentFixture<TrackedEntityInstanceSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityInstanceSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackedEntityInstanceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
