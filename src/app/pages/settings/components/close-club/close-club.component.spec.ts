import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseClubComponent } from './close-club.component';

describe('CloseClubComponent', () => {
  let component: CloseClubComponent;
  let fixture: ComponentFixture<CloseClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
