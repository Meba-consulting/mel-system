import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportGroupsComponent } from './report-groups.component';

describe('ReportGroupsComponent', () => {
  let component: ReportGroupsComponent;
  let fixture: ComponentFixture<ReportGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
