import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletingItemComponent } from './deleting-item.component';

describe('DeletingItemComponent', () => {
  let component: DeletingItemComponent;
  let fixture: ComponentFixture<DeletingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
