import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMembersListComponent } from './club-members-list.component';

describe('ClubMembersListComponent', () => {
  let component: ClubMembersListComponent;
  let fixture: ComponentFixture<ClubMembersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubMembersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
