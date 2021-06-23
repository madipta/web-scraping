import { TestBed } from '@angular/core/testing';

import { LinkPagingService } from './link-paging.service';

describe('LinkPagingService', () => {
  let service: LinkPagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkPagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
