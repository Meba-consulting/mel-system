import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDataListModalComponent } from './forms-data-list-modal.component';

describe('FormsDataListModalComponent', () => {
  let component: FormsDataListModalComponent;
  let fixture: ComponentFixture<FormsDataListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsDataListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDataListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
