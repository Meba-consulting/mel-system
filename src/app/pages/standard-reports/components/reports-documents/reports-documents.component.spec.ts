import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDocumentsComponent } from './reports-documents.component';

describe('ReportsDocumentsComponent', () => {
  let component: ReportsDocumentsComponent;
  let fixture: ComponentFixture<ReportsDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
