import { TestBed } from '@angular/core/testing';

import { ScraperService } from './scraper.service';

describe('ScraperService', () => {
  let service: ScraperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScraperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
