import { TestBed } from '@angular/core/testing';

import { ScrapeJobService } from './scrape-job.service';

describe('ScrapeJobService', () => {
  let service: ScrapeJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrapeJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
