import { Test, TestingModule } from '@nestjs/testing';
import { DomainSettingResolver } from './domain-setting.resolver';

describe('DomainSettingResolver', () => {
  let resolver: DomainSettingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DomainSettingResolver],
    }).compile();

    resolver = module.get<DomainSettingResolver>(DomainSettingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
