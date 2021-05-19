import { Test, TestingModule } from '@nestjs/testing';
import { DomainResolver } from './domain.resolver';

describe('DomainResolver', () => {
  let resolver: DomainResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainResolver],
    }).compile();

    resolver = module.get<DomainResolver>(DomainResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
