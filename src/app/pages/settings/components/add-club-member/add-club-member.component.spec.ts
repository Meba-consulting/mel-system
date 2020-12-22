import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubMemberComponent } from './add-club-member.component';

describe('AddClubMemberComponent', () => {
  let component: AddClubMemberComponent;
  let fixture: ComponentFixture<AddClubMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClubMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClubMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
