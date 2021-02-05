import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuListComponent } from './ou-list.component';

describe('OuListComponent', () => {
  let component: OuListComponent;
  let fixture: ComponentFixture<OuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
