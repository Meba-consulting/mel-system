import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDhis2DynamicDimensionComponent } from './ngx-dhis2-dynamic-dimension.component';

describe('NgxDhis2DynamicDimensionComponent', () => {
  let component: NgxDhis2DynamicDimensionComponent;
  let fixture: ComponentFixture<NgxDhis2DynamicDimensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDhis2DynamicDimensionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDhis2DynamicDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
