import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackedEntrityEntryFormComponent } from './tracked-entrity-entry-form.component';

describe('TrackedEntrityEntryFormComponent', () => {
  let component: TrackedEntrityEntryFormComponent;
  let fixture: ComponentFixture<TrackedEntrityEntryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackedEntrityEntryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackedEntrityEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
