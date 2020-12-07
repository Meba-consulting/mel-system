import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanResourceManagementComponent } from './human-resource-management.component';

describe('HumanResourceManagementComponent', () => {
  let component: HumanResourceManagementComponent;
  let fixture: ComponentFixture<HumanResourceManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumanResourceManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumanResourceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
