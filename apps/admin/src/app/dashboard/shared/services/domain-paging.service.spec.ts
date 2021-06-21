import { TestBed } from '@angular/core/testing';

import { DomainPagingService } from './domain-paging.service';

describe('DomainPagingService', () => {
  let service: DomainPagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainPagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
