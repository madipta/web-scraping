import { TestBed } from '@angular/core/testing';

import { ContentPagingService } from './content-paging.service';

describe('ContentPagingService', () => {
  let service: ContentPagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentPagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
