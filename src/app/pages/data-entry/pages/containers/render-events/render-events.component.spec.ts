import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderEventsComponent } from './render-events.component';

describe('RenderEventsComponent', () => {
  let component: RenderEventsComponent;
  let fixture: ComponentFixture<RenderEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
