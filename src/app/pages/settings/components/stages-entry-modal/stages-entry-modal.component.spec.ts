import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagesEntryModalComponent } from './stages-entry-modal.component';

describe('StagesEntryModalComponent', () => {
  let component: StagesEntryModalComponent;
  let fixture: ComponentFixture<StagesEntryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagesEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagesEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
