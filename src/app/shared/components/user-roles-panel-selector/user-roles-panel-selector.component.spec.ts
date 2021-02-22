import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRolesPanelSelectorComponent } from './user-roles-panel-selector.component';

describe('UserRolesPanelSelectorComponent', () => {
  let component: UserRolesPanelSelectorComponent;
  let fixture: ComponentFixture<UserRolesPanelSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRolesPanelSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRolesPanelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
