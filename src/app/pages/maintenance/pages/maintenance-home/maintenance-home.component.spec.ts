import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceHomeComponent } from './maintenance-home.component';

describe('MaintenanceHomeComponent', () => {
  let component: MaintenanceHomeComponent;
  let fixture: ComponentFixture<MaintenanceHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
