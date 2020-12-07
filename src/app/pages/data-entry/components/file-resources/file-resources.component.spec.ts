import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileResourcesComponent } from './file-resources.component';

describe('FileResourcesComponent', () => {
  let component: FileResourcesComponent;
  let fixture: ComponentFixture<FileResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
