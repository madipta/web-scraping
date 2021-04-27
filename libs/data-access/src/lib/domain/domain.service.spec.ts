import { Test, TestingModule } from '@nestjs/testing';
import { DomainDataAccess } from './domain-data-access';

describe('DomainDataAccess', () => {
  let service: DomainDataAccess;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainDataAccess],
    }).compile();

    service = module.get<DomainDataAccess>(DomainDataAccess);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
