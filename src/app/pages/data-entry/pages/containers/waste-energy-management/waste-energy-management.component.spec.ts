import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteEnergyManagementComponent } from './waste-energy-management.component';

describe('WasteEnergyManagementComponent', () => {
  let component: WasteEnergyManagementComponent;
  let fixture: ComponentFixture<WasteEnergyManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WasteEnergyManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WasteEnergyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
