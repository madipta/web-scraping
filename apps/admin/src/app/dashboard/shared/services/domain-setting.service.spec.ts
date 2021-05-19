import { TestBed } from '@angular/core/testing';

import { DomainSettingService } from './domain-setting.service';

describe('DomainSettingService', () => {
  let service: DomainSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
