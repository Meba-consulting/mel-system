import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubsListComponent } from './clubs-list.component';

describe('ClubsListComponent', () => {
  let component: ClubsListComponent;
  let fixture: ComponentFixture<ClubsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
