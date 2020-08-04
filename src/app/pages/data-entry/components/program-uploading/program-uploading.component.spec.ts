import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramUploadingComponent } from './program-uploading.component';

describe('ProgramUploadingComponent', () => {
  let component: ProgramUploadingComponent;
  let fixture: ComponentFixture<ProgramUploadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramUploadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramUploadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
