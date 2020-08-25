import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDcComponent } from './report-dc.component';

describe('ReportDcComponent', () => {
  let component: ReportDcComponent;
  let fixture: ComponentFixture<ReportDcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
