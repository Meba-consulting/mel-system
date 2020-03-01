import { TestBed } from '@angular/core/testing';

import { ContactsPageService } from './contacts-page.service';

describe('ContactsPageService', () => {
  let service: ContactsPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactsPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
