import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramModalComponent } from './add-program-modal.component';

describe('AddProgramModalComponent', () => {
  let component: AddProgramModalComponent;
  let fixture: ComponentFixture<AddProgramModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProgramModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgramModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
