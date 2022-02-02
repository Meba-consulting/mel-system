import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareReportsInteprentationsComponent } from './share-reports-inteprentations.component';

describe('ShareReportsInteprentationsComponent', () => {
  let component: ShareReportsInteprentationsComponent;
  let fixture: ComponentFixture<ShareReportsInteprentationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareReportsInteprentationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareReportsInteprentationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
