import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadFileResourceComponent } from './download-file-resource.component';

describe('DownloadFileResourceComponent', () => {
  let component: DownloadFileResourceComponent;
  let fixture: ComponentFixture<DownloadFileResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadFileResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadFileResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
