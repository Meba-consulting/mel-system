import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrySideBarSummaryComponent } from './entry-side-bar-summary.component';

describe('EntrySideBarSummaryComponent', () => {
  let component: EntrySideBarSummaryComponent;
  let fixture: ComponentFixture<EntrySideBarSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrySideBarSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrySideBarSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
