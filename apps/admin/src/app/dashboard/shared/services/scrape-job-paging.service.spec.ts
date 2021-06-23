import { TestBed } from '@angular/core/testing';

import { ScrapeJobPagingService } from './scrape-job-paging.service';

describe('ScrapeJobPagingService', () => {
  let service: ScrapeJobPagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapeJobPagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
