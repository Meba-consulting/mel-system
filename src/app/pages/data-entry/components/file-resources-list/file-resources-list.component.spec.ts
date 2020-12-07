import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileResourcesListComponent } from './file-resources-list.component';

describe('FileResourcesListComponent', () => {
  let component: FileResourcesListComponent;
  let fixture: ComponentFixture<FileResourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileResourcesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileResourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
