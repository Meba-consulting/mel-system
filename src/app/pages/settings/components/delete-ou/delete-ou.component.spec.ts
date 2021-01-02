import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOuComponent } from './delete-ou.component';

describe('DeleteOuComponent', () => {
  let component: DeleteOuComponent;
  let fixture: ComponentFixture<DeleteOuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
