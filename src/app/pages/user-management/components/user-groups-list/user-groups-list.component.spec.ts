import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsListComponent } from './user-groups-list.component';

describe('UserGroupsListComponent', () => {
  let component: UserGroupsListComponent;
  let fixture: ComponentFixture<UserGroupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
