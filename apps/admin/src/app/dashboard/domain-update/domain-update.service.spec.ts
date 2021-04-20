import { TestBed } from '@angular/core/testing';

import { DomainUpdateService } from './domain-update.service';

describe('DomainUpdateService', () => {
  let service: DomainUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
