import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryDashboardComponent } from './data-entry-dashboard.component';

describe('DataEntryDashboardComponent', () => {
  let component: DataEntryDashboardComponent;
  let fixture: ComponentFixture<DataEntryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEntryDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
