import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedEntityInstanceListComponent } from './tracked-entity-instance-list.component';

describe('TrackedEntityInstanceListComponent', () => {
  let component: TrackedEntityInstanceListComponent;
  let fixture: ComponentFixture<TrackedEntityInstanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntityInstanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackedEntityInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
