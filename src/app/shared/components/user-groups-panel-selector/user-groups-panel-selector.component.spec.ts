import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsPanelSelectorComponent } from './user-groups-panel-selector.component';

describe('UserGroupsPanelSelectorComponent', () => {
  let component: UserGroupsPanelSelectorComponent;
  let fixture: ComponentFixture<UserGroupsPanelSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsPanelSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsPanelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
