import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageEntryUpdatesModelComponent } from './stage-entry-updates-model.component';

describe('StageEntryUpdatesModelComponent', () => {
  let component: StageEntryUpdatesModelComponent;
  let fixture: ComponentFixture<StageEntryUpdatesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageEntryUpdatesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageEntryUpdatesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
