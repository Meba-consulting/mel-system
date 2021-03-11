import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEntryModalComponent } from './form-entry-modal.component';

describe('FormEntryModalComponent', () => {
  let component: FormEntryModalComponent;
  let fixture: ComponentFixture<FormEntryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEntryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEntryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
