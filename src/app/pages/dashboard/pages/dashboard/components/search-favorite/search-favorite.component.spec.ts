import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFavoriteComponent } from './search-favorite.component';

describe('SearchFavoriteComponent', () => {
  let component: SearchFavoriteComponent;
  let fixture: ComponentFixture<SearchFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
