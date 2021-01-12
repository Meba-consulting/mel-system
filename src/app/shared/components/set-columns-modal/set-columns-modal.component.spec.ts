import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetColumnsModalComponent } from './set-columns-modal.component';

describe('SetColumnsModalComponent', () => {
  let component: SetColumnsModalComponent;
  let fixture: ComponentFixture<SetColumnsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetColumnsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetColumnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
