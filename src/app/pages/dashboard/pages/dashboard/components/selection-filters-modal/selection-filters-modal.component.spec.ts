import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionFiltersModalComponent } from './selection-filters-modal.component';

describe('SelectionFiltersModalComponent', () => {
  let component: SelectionFiltersModalComponent;
  let fixture: ComponentFixture<SelectionFiltersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionFiltersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionFiltersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
