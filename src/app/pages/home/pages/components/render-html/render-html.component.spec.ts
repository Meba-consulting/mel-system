import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderHtmlComponent } from './render-html.component';

describe('RenderHtmlComponent', () => {
  let component: RenderHtmlComponent;
  let fixture: ComponentFixture<RenderHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
