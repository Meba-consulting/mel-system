import { TestBed } from '@angular/core/testing';

import { SavedFavoritesService } from './saved-favorites.service';

describe('SavedFavoritesService', () => {
  let service: SavedFavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedFavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
