import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesListingComponent } from './messages-listing.component';

describe('MessagesListingComponent', () => {
  let component: MessagesListingComponent;
  let fixture: ComponentFixture<MessagesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
