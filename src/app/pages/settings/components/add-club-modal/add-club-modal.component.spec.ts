import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubModalComponent } from './add-club-modal.component';

describe('AddClubModalComponent', () => {
  let component: AddClubModalComponent;
  let fixture: ComponentFixture<AddClubModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClubModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
