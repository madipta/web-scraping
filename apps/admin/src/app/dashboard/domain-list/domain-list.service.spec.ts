import { TestBed } from '@angular/core/testing';

import { DomainListService } from './domain-list.service';

describe('DomainListService', () => {
  let service: DomainListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
